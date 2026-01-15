# 🤖 Telegram Support Bot

A free, self-hosted live chat support system using Telegram.

## How It Works

```
Customer (Website) → Clicks Widget → Opens Telegram Bot
                                           ↓
                                    Creates Ticket
                                           ↓
You (Admin) ← Gets notified in Telegram ←─┘
     ↓
Reply with /reply command
     ↓
Customer gets your response in real-time
```

## Quick Setup (5 minutes)

### Step 1: Create Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Choose a name (e.g., "MyWebsite Support")
4. Choose a username (e.g., "mywebsite_support_bot")
5. **Copy the token** you receive

### Step 2: Get Your Chat ID

1. Search for **@userinfobot** on Telegram
2. Send `/start`
3. **Copy your ID number**

### Step 3: Configure the Bot

Edit `bot.js` and replace:

```javascript
BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',      // Paste your token
ADMIN_CHAT_ID: 'YOUR_CHAT_ID_HERE',    // Paste your chat ID
```

### Step 4: Install & Run

```bash
cd telegram-support-bot
npm install
npm start
```

## Usage

### For Customers
1. Click support widget on your website
2. Opens Telegram chat with your bot
3. Send `/start` to create ticket
4. Chat normally - you'll respond!

### For You (Admin)
In your Telegram, use these commands:

| Command | Description |
|---------|-------------|
| `/tickets` | List all open tickets |
| `/reply abc123 Hi!` | Reply to ticket abc123 |
| `/closeticket abc123` | Close ticket abc123 |

## Add Widget to Your Website

### Option 1: Simple Script (Recommended)

Add this before `</body>`:

```html
<script src="https://yourserver.com/widget-embed.js" data-bot="your_bot_username"></script>
```

Customize with attributes:
- `data-bot` - Your bot username (required)
- `data-color` - Button color (default: #0088cc)
- `data-position` - "left" or "right" (default: right)
- `data-message` - Tooltip text

### Option 2: Direct Link

Just link to your bot:
```html
<a href="https://t.me/your_bot_username">Contact Support</a>
```

## Using a Support Group (Multiple Agents)

Instead of your personal chat, use a Telegram group:

1. Create a new Telegram group
2. Add your bot to the group
3. Make the bot an admin
4. Get group ID: Add @userinfobot to group, it will show the group ID (negative number)
5. Set `ADMIN_CHAT_ID` to the group ID

Now multiple team members can respond!

## Environment Variables (Optional)

Instead of editing `bot.js`, use environment variables:

```bash
export BOT_TOKEN="your_token_here"
export ADMIN_CHAT_ID="your_chat_id"
export WEB_PORT=3001

npm start
```

## File Structure

```
telegram-support-bot/
├── bot.js              # Main bot code
├── package.json        # Dependencies
├── tickets.json        # Ticket data (auto-created)
├── widget-embed.js     # Embeddable widget script
├── public/
│   └── widget.html     # Widget demo page
└── README.md           # This file
```

## Cost

**$0** - Completely free!

- Telegram Bot API: Free
- Self-hosted: Runs on your existing server
- No limits on tickets or messages
