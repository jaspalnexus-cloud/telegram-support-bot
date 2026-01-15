# 📋 Telegram Support Bot - Project Status Guide

> This file documents the project status, git information, and deployment instructions.
> Use this as a reference if you get disconnected or need to continue work later.

---

## 🔗 Git Repository Info

| Item | Value |
|------|-------|
| **GitHub URL** | https://github.com/jaspalnexus-cloud/telegram-support-bot |
| **Branch** | `main` |
| **Last Commit** | `6427b35` - "Telegram Support Bot - Initial commit" |
| **Status** | ✅ All code pushed to GitHub |

### Quick Git Commands
```bash
# Clone the repo
git clone https://github.com/jaspalnexus-cloud/telegram-support-bot.git

# Check status
git status

# Pull latest changes
git pull origin main

# Push new changes
git add .
git commit -m "Your message"
git push origin main
```

---

## 📁 Project Files

```
telegram-support-bot/
├── bot.js              # Main bot code
├── package.json        # Dependencies (node-telegram-bot-api, express)
├── widget-embed.js     # Embeddable widget for websites
├── public/
│   └── widget.html     # Widget demo page
├── README.md           # Usage documentation
├── DEPLOY.md           # General deployment guide
├── DEPLOY-ORACLE.md    # Oracle Cloud deployment guide
├── Dockerfile          # Docker deployment
├── render.yaml         # Render.com deployment config
├── ecosystem.config.js # PM2 configuration
├── setup.sh            # Auto setup script
└── PROJECT-STATUS.md   # This file
```

---

## 🚀 Deploy on Oracle Cloud (FREE Forever)

### Prerequisites
1. Oracle Cloud account (free tier)
2. Telegram Bot Token (from @BotFather)
3. Your Telegram Chat ID (from @userinfobot)

### Step-by-Step Installation

#### Step 1: Create Oracle VM
1. Go to [Oracle Cloud](https://cloud.oracle.com)
2. Create a **Compute Instance**:
   - Shape: `VM.Standard.E2.1.Micro` (Always Free)
   - OS: Ubuntu 22.04
   - Download your SSH key

#### Step 2: Connect to Your VM
```bash
ssh -i your-key.key ubuntu@YOUR_VM_IP
```

#### Step 3: Install Node.js
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

#### Step 4: Clone & Setup Bot
```bash
# Clone from GitHub
git clone https://github.com/jaspalnexus-cloud/telegram-support-bot.git
cd telegram-support-bot

# Install dependencies
npm install
```

#### Step 5: Configure Bot
```bash
# Edit bot.js with your credentials
nano bot.js
```

Replace these values:
```javascript
BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',      // From @BotFather
ADMIN_CHAT_ID: 'YOUR_CHAT_ID_HERE',    // From @userinfobot
```

#### Step 6: Install PM2 (Keep Bot Running Forever)
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the bot
pm2 start bot.js --name "telegram-bot"

# Auto-start on reboot
pm2 startup
pm2 save
```

#### Step 7: Open Firewall Port (if using web widget)
```bash
# Allow port 3001
sudo iptables -I INPUT -p tcp --dport 3001 -j ACCEPT

# Also open in Oracle Cloud Console:
# Networking > Virtual Cloud Networks > Security Lists > Add Ingress Rule
# Source: 0.0.0.0/0, Port: 3001
```

### Useful PM2 Commands
```bash
pm2 status          # Check bot status
pm2 logs            # View logs
pm2 restart all     # Restart bot
pm2 stop all        # Stop bot
pm2 delete all      # Remove from PM2
```

---

## ⚙️ Bot Configuration

### Environment Variables (Alternative to editing bot.js)
```bash
export BOT_TOKEN="your_token_here"
export ADMIN_CHAT_ID="your_chat_id"
export WEB_PORT=3001

pm2 start bot.js --name "telegram-bot"
```

### Or create `.env` file:
```bash
BOT_TOKEN=your_token_here
ADMIN_CHAT_ID=your_chat_id
WEB_PORT=3001
```

---

## 🎮 Bot Commands

### Admin Commands (for you)
| Command | Description |
|---------|-------------|
| `/tickets` | List all open tickets |
| `/reply abc123 Hi!` | Reply to ticket abc123 |
| `/closeticket abc123` | Close ticket abc123 |

### Customer Commands
| Command | Description |
|---------|-------------|
| `/start` | Create new support ticket |
| (any message) | Send message to support |

---

## 🌐 Add Widget to Your Website

```html
<script 
  src="https://YOUR_VM_IP:3001/widget-embed.js" 
  data-bot="your_bot_username"
  data-color="#0088cc"
  data-position="right">
</script>
```

---

## 🔧 Troubleshooting

### Bot not responding?
```bash
pm2 logs telegram-bot    # Check for errors
pm2 restart telegram-bot # Restart bot
```

### Can't connect to Oracle VM?
- Check Security List rules in Oracle Console
- Verify SSH key permissions: `chmod 400 your-key.key`

### Port not accessible?
- Check iptables: `sudo iptables -L`
- Check Oracle Security List ingress rules

---

## 📝 What Was Done

1. ✅ Created Telegram Support Bot with ticket system
2. ✅ Added embeddable website widget
3. ✅ Initialized Git repository
4. ✅ Pushed code to GitHub (`main` branch)
5. ✅ Created deployment guides (Oracle, Render, Docker)

---

## 🔜 Next Steps

- [ ] Deploy to Oracle Cloud
- [ ] Configure bot token and chat ID
- [ ] Test bot functionality
- [ ] Add widget to your website

---

*Last updated: January 15, 2026*
