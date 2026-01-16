# 🔑 Your Telegram Bot Credentials

✅ **Successfully configured!**

## Your Bot Details

```env
BOT_TOKEN=8450813088:AAFfDYMa0UEzsIwV2GyvyNXN-1R8Q5PHrSU
ADMIN_CHAT_ID=8450813088
PORT=3000
```

---

## 🚀 Quick Test - Run Locally (Right Now!)

### 1. Install Dependencies (if not done)
```bash
cd telegram-support-bot
npm install
```

### 2. Create .env file
```bash
# Copy the example file
cp .env.example .env
```

Or create manually:
```bash
nano .env
```
Then paste:
```env
BOT_TOKEN=8450813088:AAFfDYMa0UEzsIwV2GyvyNXN-1R8Q5PHrSU
ADMIN_CHAT_ID=8450813088
PORT=3000
```

### 3. Run the Bot
```bash
node bot.js
```

You should see:
```
✅ Bot is running...
✅ Admin chat ID: 8450813088
🌐 Widget server: http://localhost:3000
```

### 4. Test in Telegram
1. Open Telegram
2. Search for your bot (the username you created)
3. Send `/start`
4. Send a test message like "Hello, this is a test ticket"
5. You should receive the ticket in your Telegram chat!

### 5. Test Admin Commands
In your Telegram (as admin):
- `/tickets` - See all open tickets
- `/reply T001 Hello! I got your message` - Reply to ticket
- `/closeticket T001` - Close the ticket

---

## 🌐 Test Web Widget Locally

1. While bot is running, open browser
2. Go to: http://localhost:3000/widget.html
3. Enter name and message
4. Submit
5. Check your Telegram for the ticket!

---

## 📱 Your Bot Info

- **Bot Token:** `8450813088:AAFfDYMa0UEzsIwV2GyvyNXN-1R8Q5PHrSU`
- **Admin Chat ID:** `8450813088`
- **Web Widget Port:** `3000`

---

## 🔐 Security Note

⚠️ **IMPORTANT:** I've saved your credentials in `.env.example` for easy setup.

**Before uploading to GitHub:**
1. Make sure `.env` is in `.gitignore` (already done ✅)
2. Never share your BOT_TOKEN publicly
3. If token gets leaked, revoke it with `/revoke` to @BotFather

---

## 📤 Next Steps

### Option A: Test Locally First ✅ (Recommended)
Follow the "Quick Test" section above to make sure everything works!

### Option B: Deploy to Oracle Cloud
Once local testing works, follow: `QUICK-START-CHECKLIST.md`

---

## 🆘 Troubleshooting

### Bot doesn't respond?
- Check if BOT_TOKEN is correct
- Make sure bot is running (`node bot.js`)
- Check for errors in terminal

### Don't receive tickets?
- Check if ADMIN_CHAT_ID is correct (must be YOUR Telegram user ID)
- Send `/start` to your bot first
- Check terminal for errors

### Widget doesn't load?
- Make sure bot is running
- Check if port 3000 is available
- Try: http://127.0.0.1:3000/widget.html

---

**Ready to test?** Run these commands now:
```bash
cd telegram-support-bot
npm install
cp .env.example .env
node bot.js
```

Then open Telegram and message your bot! 🚀
