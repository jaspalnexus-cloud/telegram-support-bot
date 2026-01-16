# ✅ Quick Start Checklist - Telegram Support Bot

Follow this checklist to get your bot running on Oracle Cloud!

---

## Part 1: Get Telegram Credentials (5 minutes)

### □ Get Bot Token from @BotFather

1. □ Open Telegram app
2. □ Search for `@BotFather`
3. □ Send `/newbot`
4. □ Enter bot display name (e.g., "My Support Bot")
5. □ Enter bot username (must end with 'bot', e.g., "mysupport_bot")
6. □ **COPY THE TOKEN** - Save it somewhere safe!
   ```
   Example: 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567
   ```

### □ Get Your Admin Chat ID from @userinfobot

1. □ In Telegram, search for `@userinfobot`
2. □ Send any message (like "hello")
3. □ **COPY YOUR ID** - Save it somewhere safe!
   ```
   Example: 123456789
   ```

✅ **You now have:**
- `BOT_TOKEN` = `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567`
- `ADMIN_CHAT_ID` = `123456789`

📖 **Need help?** See detailed guide: `TELEGRAM-SETUP-GUIDE.md`

---

## Part 2: Setup Oracle Cloud (15-20 minutes)

### □ Create Oracle Account

1. □ Go to [cloud.oracle.com](https://cloud.oracle.com)
2. □ Click "Sign Up"
3. □ Fill in your details (credit card needed for verification only)
4. □ Choose home region (pick closest to your location)
5. □ Wait for account approval (can take 1-24 hours)

### □ Create Free VM Instance

1. □ Login to Oracle Cloud Console
2. □ Click ☰ Menu → Compute → Instances
3. □ Click "Create Instance"
4. □ Name: `telegram-bot`
5. □ Image: **Ubuntu 22.04** (Canonical Ubuntu)
6. □ Shape: **VM.Standard.E2.1.Micro** (Always Free)
7. □ Download SSH keys (save the .key file!)
8. □ Click "Create"
9. □ Wait for status to be "Running" (green icon)
10. □ **COPY PUBLIC IP** - Save it!

### □ Open Port 3000 (for web widget)

1. □ Go to Instance Details → Primary VNIC → Subnet
2. □ Click your subnet
3. □ Click "Default Security List"
4. □ Click "Add Ingress Rules"
5. □ Source CIDR: `0.0.0.0/0`
6. □ Destination Port: `3000`
7. □ Click "Add Ingress Rules"

### □ Connect to Your VM

**On Windows:**
1. □ Download PuTTY and PuTTYgen
2. □ Convert .key to .ppk using PuTTYgen
3. □ Open PuTTY → Enter IP → Load .ppk → Connect
4. □ Username: `ubuntu`

**On Mac/Linux:**
```bash
chmod 400 ~/Downloads/ssh-key.key
ssh -i ~/Downloads/ssh-key.key ubuntu@YOUR_IP
```

---

## Part 3: Install Bot on Server (10 minutes)

### □ Install Node.js

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version
```

### □ Install Git

```bash
sudo apt install -y git
```

### □ Upload Bot Code

**Option A: Clone from GitHub (if you pushed to GitHub)**
```bash
git clone https://github.com/YOUR_USERNAME/telegram-support-bot.git
cd telegram-support-bot
```

**Option B: Upload files manually**
```bash
mkdir telegram-support-bot
cd telegram-support-bot
# Use WinSCP (Windows) or scp (Mac/Linux) to upload files
```

### □ Install Dependencies

```bash
npm install
```

### □ Create Environment File

```bash
nano .env
```

Paste this (use YOUR credentials from Part 1):
```env
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567
ADMIN_CHAT_ID=123456789
PORT=3000
```

Save: `Ctrl + O`, `Enter`, `Ctrl + X`

### □ Test Run

```bash
node bot.js
```

You should see:
```
✅ Bot is running...
✅ Admin chat ID: 123456789
🌐 Widget server: http://localhost:3000
```

**Test it:** Open Telegram and send `/start` to your bot!

Press `Ctrl + C` to stop.

---

## Part 4: Keep Bot Running 24/7 (5 minutes)

### □ Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### □ Start Bot with PM2

```bash
pm2 start bot.js --name telegram-bot
pm2 save
pm2 startup
# Copy and run the command it gives you
```

### □ Check Status

```bash
pm2 status
pm2 logs telegram-bot
```

### □ Useful PM2 Commands

```bash
pm2 restart telegram-bot  # Restart bot
pm2 stop telegram-bot     # Stop bot
pm2 logs telegram-bot     # View logs
pm2 monit                 # Monitor in real-time
```

---

## Part 5: Test Everything (5 minutes)

### □ Test Bot in Telegram

1. □ Open Telegram
2. □ Find your bot (search for username you created)
3. □ Send `/start`
4. □ Send a test message
5. □ Check your admin account for the ticket
6. □ Reply to the ticket using `/reply TICKET_ID message`
7. □ Close ticket using `/closeticket TICKET_ID`

### □ Test Web Widget

1. □ Open browser
2. □ Go to `http://YOUR_SERVER_IP:3000/widget.html`
3. □ Enter name and message
4. □ Submit
5. □ Check Telegram for the ticket
6. □ Reply from Telegram
7. □ Check browser to see the reply

---

## 🎉 Success!

Your bot is now running 24/7 on Oracle Cloud!

### Admin Commands (use these in Telegram)

- `/tickets` - See all open tickets
- `/reply TICKET_ID message` - Reply to a ticket
- `/closeticket TICKET_ID` - Close a ticket

### User Commands

- `/start` - Start the bot
- `/status` - Check ticket status
- `/close` - Close your ticket

---

## 📚 Additional Resources

- **Telegram Setup:** `TELEGRAM-SETUP-GUIDE.md`
- **Oracle Deployment:** `DEPLOY-ORACLE.md`
- **Project Overview:** `README.md`
- **Current Status:** `PROJECT-STATUS.md`

---

## 🆘 Troubleshooting

### Bot not responding in Telegram?
```bash
pm2 logs telegram-bot  # Check for errors
pm2 restart telegram-bot
```

### Can't access web widget?
```bash
# Check if port 3000 is open
sudo ufw status
sudo ufw allow 3000

# Check if bot is running
pm2 status
```

### Bot crashes on startup?
```bash
# Check logs
pm2 logs telegram-bot --lines 50

# Common issues:
# 1. Wrong BOT_TOKEN or ADMIN_CHAT_ID
# 2. Missing .env file
# 3. Port 3000 already in use
```

### Need to update code?
```bash
cd telegram-support-bot
git pull  # If using git
pm2 restart telegram-bot
```

---

## 🔐 Security Tips

- ✅ Keep your BOT_TOKEN secret
- ✅ Never commit .env to GitHub
- ✅ Use firewall (only open necessary ports)
- ✅ Regular system updates: `sudo apt update && sudo apt upgrade`
- ✅ Monitor logs: `pm2 logs`

---

## 💡 Next Steps

Once everything is working:

1. **Customize the bot:**
   - Edit messages in `bot.js`
   - Modify widget styling in `public/widget.html`
   - Add more features

2. **Add a domain name:**
   - Point domain to your Oracle IP
   - Setup Nginx reverse proxy
   - Add SSL certificate (Let's Encrypt)

3. **Backup your data:**
   - Regularly backup `tickets.json`
   - Consider using a database (MongoDB)

4. **Monitor performance:**
   - Setup uptime monitoring
   - Configure alerts

---

**Need Help?** Check the other documentation files or review the bot code!
