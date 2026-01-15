const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// ============== CONFIGURATION ==============
const CONFIG = {
    // Your Telegram Bot Token (get from @BotFather)
    BOT_TOKEN: process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE',
    
    // Your Telegram Chat ID or Group ID (where you receive support messages)
    ADMIN_CHAT_ID: process.env.ADMIN_CHAT_ID || 'YOUR_CHAT_ID_HERE',
    
    // Web server port for the widget API
    WEB_PORT: process.env.WEB_PORT || 3001,
    
    // Data file for storing tickets
    DATA_FILE: path.join(__dirname, 'tickets.json')
};

// ============== DATA STORAGE ==============
let tickets = {};
let userTickets = {}; // Map Telegram user ID to ticket ID
let adminReplyState = {}; // Track which ticket admin is replying to

function loadData() {
    try {
        if (fs.existsSync(CONFIG.DATA_FILE)) {
            const data = JSON.parse(fs.readFileSync(CONFIG.DATA_FILE, 'utf8'));
            tickets = data.tickets || {};
            userTickets = data.userTickets || {};
        }
    } catch (err) {
        console.error('Error loading data:', err);
    }
}

function saveData() {
    try {
        fs.writeFileSync(CONFIG.DATA_FILE, JSON.stringify({ tickets, userTickets }, null, 2));
    } catch (err) {
        console.error('Error saving data:', err);
    }
}

// ============== TELEGRAM BOT ==============
const bot = new TelegramBot(CONFIG.BOT_TOKEN, { polling: true });

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const userName = msg.from.first_name || 'User';
    
    // Check if user has an open ticket
    if (userTickets[userId]) {
        bot.sendMessage(chatId, `👋 Welcome back, ${userName}!\n\nYou have an open ticket (#${userTickets[userId].slice(0,8)}). Just send your message and our support team will respond.`);
        return;
    }
    
    // Create new ticket
    const ticketId = uuidv4();
    tickets[ticketId] = {
        id: ticketId,
        status: 'open',
        userId: userId,
        userChatId: chatId,
        userName: userName,
        userUsername: msg.from.username || null,
        createdAt: new Date().toISOString(),
        messages: []
    };
    userTickets[userId] = ticketId;
    saveData();
    
    // Notify user
    bot.sendMessage(chatId, 
        `👋 Hello ${userName}!\n\n` +
        `🎫 Ticket #${ticketId.slice(0,8)} created.\n\n` +
        `Just type your question or issue and our support team will respond as soon as possible.\n\n` +
        `Commands:\n` +
        `/status - Check ticket status\n` +
        `/close - Close your ticket`
    );
    
    // Notify admin with buttons
    const shortId = ticketId.slice(0,8);
    bot.sendMessage(CONFIG.ADMIN_CHAT_ID,
        `🆕 NEW TICKET\n\n` +
        `🎫 Ticket: #${shortId}\n` +
        `👤 User: ${userName} ${msg.from.username ? `(@${msg.from.username})` : ''}\n` +
        `🆔 User ID: ${userId}\n` +
        `📅 Time: ${new Date().toLocaleString()}`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '💬 Reply', callback_data: `reply_${shortId}` },
                        { text: '❌ Close Ticket', callback_data: `close_${shortId}` }
                    ]
                ]
            }
        }
    );
});

// Handle /status command
bot.onText(/\/status/, (msg) => {
    const userId = msg.from.id;
    const ticketId = userTickets[userId];
    
    if (!ticketId || !tickets[ticketId]) {
        bot.sendMessage(msg.chat.id, '❌ You don\'t have an open ticket. Use /start to create one.');
        return;
    }
    
    const ticket = tickets[ticketId];
    bot.sendMessage(msg.chat.id,
        `🎫 Ticket #${ticketId.slice(0,8)}\n\n` +
        `Status: ${ticket.status === 'open' ? '🟢 Open' : '🔴 Closed'}\n` +
        `Created: ${new Date(ticket.createdAt).toLocaleString()}\n` +
        `Messages: ${ticket.messages.length}`
    );
});

// Handle /close command (from user)
bot.onText(/\/close/, (msg) => {
    const userId = msg.from.id;
    const ticketId = userTickets[userId];
    
    if (!ticketId || !tickets[ticketId]) {
        bot.sendMessage(msg.chat.id, '❌ You don\'t have an open ticket.');
        return;
    }
    
    tickets[ticketId].status = 'closed';
    tickets[ticketId].closedAt = new Date().toISOString();
    delete userTickets[userId];
    saveData();
    
    bot.sendMessage(msg.chat.id, 
        `✅ Ticket #${ticketId.slice(0,8)} has been closed.\n\n` +
        `Thank you for contacting us! Use /start to open a new ticket anytime.`
    );
    
    // Notify admin
    bot.sendMessage(CONFIG.ADMIN_CHAT_ID,
        `🔴 TICKET CLOSED BY USER\n\n` +
        `🎫 Ticket: #${ticketId.slice(0,8)}\n` +
        `👤 User: ${tickets[ticketId].userName}`
    );
});

// Handle /cancel command (cancel reply mode)
bot.onText(/\/cancel/, (msg) => {
    if (msg.chat.id.toString() !== CONFIG.ADMIN_CHAT_ID.toString()) return;
    
    if (adminReplyState[msg.from.id]) {
        delete adminReplyState[msg.from.id];
        bot.sendMessage(msg.chat.id, '❌ Reply cancelled.');
    }
});

// Handle /reply command (admin only) - still works for manual use
bot.onText(/\/reply (\w+) (.+)/, (msg, match) => {
    if (msg.chat.id.toString() !== CONFIG.ADMIN_CHAT_ID.toString()) {
        return; // Only admin can use this
    }
    
    const shortId = match[1];
    const replyText = match[2];
    
    sendReplyToUser(shortId, replyText, msg.chat.id);
});

// Handle /closeticket command (admin)
bot.onText(/\/closeticket (\w+)/, (msg, match) => {
    if (msg.chat.id.toString() !== CONFIG.ADMIN_CHAT_ID.toString()) {
        return;
    }
    
    const shortId = match[1];
    closeTicket(shortId, msg.chat.id);
});

// Handle /tickets command (admin) - list open tickets with buttons
bot.onText(/\/tickets/, (msg) => {
    if (msg.chat.id.toString() !== CONFIG.ADMIN_CHAT_ID.toString()) {
        return;
    }
    
    const openTickets = Object.values(tickets).filter(t => t.status === 'open');
    
    if (openTickets.length === 0) {
        bot.sendMessage(msg.chat.id, '📭 No open tickets.');
        return;
    }
    
    openTickets.forEach(t => {
        const shortId = t.id.slice(0,8);
        const lastMsg = t.messages.length > 0 ? t.messages[t.messages.length - 1] : null;
        
        let message = `🎫 Ticket #${shortId}\n`;
        message += `👤 ${t.userName} ${t.userUsername ? `(@${t.userUsername})` : ''}\n`;
        message += `📅 ${new Date(t.createdAt).toLocaleString()}\n`;
        message += `💬 ${t.messages.length} messages\n`;
        
        if (lastMsg) {
            message += `\n📝 Last message:\n"${lastMsg.text.substring(0, 100)}${lastMsg.text.length > 100 ? '...' : ''}"`;
        }
        
        bot.sendMessage(msg.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '💬 Reply', callback_data: `reply_${shortId}` },
                        { text: '❌ Close', callback_data: `close_${shortId}` }
                    ]
                ]
            }
        });
    });
});

// Handle button callbacks
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    const userId = query.from.id;
    
    // Only allow admin
    if (chatId.toString() !== CONFIG.ADMIN_CHAT_ID.toString()) {
        bot.answerCallbackQuery(query.id, { text: '❌ Not authorized' });
        return;
    }
    
    if (data.startsWith('reply_')) {
        const shortId = data.replace('reply_', '');
        const ticketId = Object.keys(tickets).find(id => id.startsWith(shortId));
        
        if (!ticketId || !tickets[ticketId]) {
            bot.answerCallbackQuery(query.id, { text: '❌ Ticket not found' });
            return;
        }
        
        // Set reply state
        adminReplyState[userId] = shortId;
        
        bot.answerCallbackQuery(query.id, { text: '✏️ Type your reply now' });
        bot.sendMessage(chatId, 
            `💬 Replying to Ticket #${shortId}\n` +
            `👤 User: ${tickets[ticketId].userName}\n\n` +
            `Type your message now (or /cancel to cancel):`,
            { reply_markup: { force_reply: true } }
        );
    }
    
    if (data.startsWith('close_')) {
        const shortId = data.replace('close_', '');
        closeTicket(shortId, chatId);
        bot.answerCallbackQuery(query.id, { text: '✅ Ticket closed' });
    }
});

// Handle regular messages from users AND admin replies
bot.on('message', (msg) => {
    // Skip commands
    if (msg.text && msg.text.startsWith('/')) return;
    
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    // Check if this is an admin reply
    if (chatId.toString() === CONFIG.ADMIN_CHAT_ID.toString()) {
        // Check if admin is in reply mode
        if (adminReplyState[userId]) {
            const shortId = adminReplyState[userId];
            sendReplyToUser(shortId, msg.text, chatId);
            delete adminReplyState[userId];
        }
        return;
    }
    
    // Regular user message
    const ticketId = userTickets[userId];
    
    // If no ticket, prompt to start
    if (!ticketId || !tickets[ticketId]) {
        bot.sendMessage(msg.chat.id, '👋 Please use /start to open a support ticket first.');
        return;
    }
    
    const ticket = tickets[ticketId];
    const shortId = ticketId.slice(0,8);
    
    // Save message
    ticket.messages.push({
        from: 'user',
        text: msg.text || '[Media]',
        time: new Date().toISOString()
    });
    saveData();
    
    // Forward to admin with buttons
    bot.sendMessage(CONFIG.ADMIN_CHAT_ID,
        `💬 MESSAGE from ${ticket.userName}\n` +
        `🎫 Ticket #${shortId}\n\n` +
        `${msg.text || '[Media sent]'}`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '💬 Reply', callback_data: `reply_${shortId}` },
                        { text: '❌ Close', callback_data: `close_${shortId}` }
                    ]
                ]
            }
        }
    );
    
    // Confirm to user
    bot.sendMessage(msg.chat.id, '✅ Message sent! Our team will respond soon.');
});

// ============== HELPER FUNCTIONS ==============

function sendReplyToUser(shortId, replyText, adminChatId) {
    const ticketId = Object.keys(tickets).find(id => id.startsWith(shortId));
    
    if (!ticketId || !tickets[ticketId]) {
        bot.sendMessage(adminChatId, `❌ Ticket #${shortId} not found.`);
        return;
    }
    
    const ticket = tickets[ticketId];
    
    // Save message
    ticket.messages.push({
        from: 'admin',
        text: replyText,
        time: new Date().toISOString()
    });
    saveData();
    
    // Send to user
    bot.sendMessage(ticket.userChatId, `💬 Support:\n\n${replyText}`);
    
    // Confirm to admin
    bot.sendMessage(adminChatId, `✅ Reply sent to ${ticket.userName} (Ticket #${shortId})`);
}

function closeTicket(shortId, adminChatId) {
    const ticketId = Object.keys(tickets).find(id => id.startsWith(shortId));
    
    if (!ticketId || !tickets[ticketId]) {
        bot.sendMessage(adminChatId, `❌ Ticket #${shortId} not found.`);
        return;
    }
    
    const ticket = tickets[ticketId];
    ticket.status = 'closed';
    ticket.closedAt = new Date().toISOString();
    delete userTickets[ticket.userId];
    saveData();
    
    // Notify user
    bot.sendMessage(ticket.userChatId,
        `✅ Your ticket #${shortId} has been closed by support.\n\n` +
        `Thank you for contacting us! Use /start to open a new ticket anytime.`
    );
    
    bot.sendMessage(adminChatId, `✅ Ticket #${shortId} closed.`);
}

// ============== WEB SERVER (for widget) ==============
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API: Get bot info for widget
app.get('/api/bot-info', (req, res) => {
    bot.getMe().then(info => {
        res.json({
            username: info.username,
            link: `https://t.me/${info.username}`
        });
    }).catch(err => {
        res.status(500).json({ error: 'Bot not configured' });
    });
});

// API: Stats
app.get('/api/stats', (req, res) => {
    const openTickets = Object.values(tickets).filter(t => t.status === 'open').length;
    const totalTickets = Object.keys(tickets).length;
    res.json({ openTickets, totalTickets });
});

// ============== START ==============
loadData();

console.log('');
console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║         🤖 TELEGRAM SUPPORT BOT                            ║');
console.log('╠════════════════════════════════════════════════════════════╣');

app.listen(CONFIG.WEB_PORT, () => {
    console.log(`║  🌐 Widget API: http://localhost:${CONFIG.WEB_PORT}                  ║`);
});

bot.getMe().then(info => {
    console.log(`║  🤖 Bot: @${info.username.padEnd(47)} ║`);
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  📋 Admin Commands:                                        ║');
    console.log('║     /tickets - List open tickets with buttons              ║');
    console.log('║     /cancel - Cancel reply mode                            ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  🖱️  Click "Reply" button to respond to tickets!           ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  Press Ctrl+C to stop                                      ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
}).catch(err => {
    console.log('║  ❌ Bot not connected - check BOT_TOKEN                    ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('Setup Instructions:');
    console.log('1. Message @BotFather on Telegram');
    console.log('2. Send /newbot and follow instructions');
    console.log('3. Copy the token and set BOT_TOKEN in bot.js');
    console.log('4. Get your chat ID from @userinfobot');
    console.log('5. Set ADMIN_CHAT_ID in bot.js');
});

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    saveData();
    process.exit(0);
});
