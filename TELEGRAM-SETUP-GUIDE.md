# 🤖 Getting Telegram Bot Credentials

## Step 1: Create Your Bot and Get Token

### A. Open Telegram and Find BotFather
1. Open Telegram on your phone or desktop
2. Search for **@BotFather** (official Telegram bot)
3. Start a chat with BotFather

### B. Create New Bot
1. Send `/newbot` to BotFather
2. BotFather will ask: **"Alright, a new bot. How are we going to call it?"**
   - Enter your bot's display name (e.g., "My Support Bot")
3. BotFather will ask: **"Good. Now let's choose a username for your bot."**
   - Must end in 'bot' (e.g., "mysupport_bot" or "MyCompanyBot")
   - Must be unique (if taken, try another)

### C. Get Your Bot Token
BotFather will reply with something like:
```
Done! Congratulations on your new bot. You will find it at t.me/mysupport_bot

Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567

Keep your token secure and store it safely, it can be used by anyone to control your bot.
```

**COPY THIS TOKEN** ⬆️ - This is your `BOT_TOKEN`

Example: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567`

---

## Step 2: Get Your Admin Chat ID

### A. Find Your Chat ID Bot
1. In Telegram, search for **@userinfobot**
2. Start a chat with it
3. Send any message (like "hi")

### B. Get Your Chat ID
The bot will reply with something like:
```
Id: 123456789
First name: John
Username: @johnsmith
```

**COPY THE ID NUMBER** ⬆️ - This is your `ADMIN_CHAT_ID`

Example: `123456789`

---

## ✅ Summary - You Now Have:

```
BOT_TOKEN = "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567"
ADMIN_CHAT_ID = "123456789"
```

Keep these safe! You'll need them for deployment.

---

## 🔒 Security Tips

1. ❌ **NEVER** share your bot token publicly
2. ❌ **NEVER** commit tokens to GitHub (use environment variables)
3. ✅ Use `.env` file locally (excluded from git)
4. ✅ Use environment variables on server
5. ⚠️ If token is leaked, use `/revoke` with @BotFather to get a new one

---

## Optional: Customize Your Bot

After creation, you can send these commands to @BotFather:

- `/setdescription` - Set bot description
- `/setabouttext` - Set "About" text
- `/setuserpic` - Upload profile picture
- `/setcommands` - Set command list (shown in menu)

Example commands to set:
```
start - Start the bot
status - Check ticket status
close - Close your current ticket
```

---

## Next Steps

Once you have both credentials:
1. Go to Oracle Cloud setup
2. Set environment variables with these values
3. Start your bot!

See `DEPLOY-ORACLE.md` for full deployment guide.
