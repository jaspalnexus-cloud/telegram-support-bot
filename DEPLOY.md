# 🚀 Deploy to Render.com (FREE 24/7)

## Step 1: Get Your Bot Credentials

Before deploying, you need:

1. **Bot Token** - From @BotFather on Telegram
2. **Your Chat ID** - From @userinfobot on Telegram

## Step 2: Push to GitHub

1. Create a new repository on GitHub
2. Push this folder:

```bash
cd telegram-support-bot
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/telegram-support-bot.git
git push -u origin main
```

## Step 3: Deploy on Render

1. Go to [render.com](https://render.com) and sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account
4. Select your `telegram-support-bot` repository
5. Configure:
   - **Name:** telegram-support-bot
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node bot.js`
   - **Plan:** Free

6. Click **"Advanced"** → **"Add Environment Variable"**:
   - `BOT_TOKEN` = your bot token
   - `ADMIN_CHAT_ID` = your chat ID

7. Click **"Create Web Service"**

## Step 4: Done! 🎉

Your bot will be live in ~2 minutes at:
`https://telegram-support-bot.onrender.com`

## Keeping It Awake

Render free tier sleeps after 15 min of no HTTP requests.
BUT our bot uses Telegram polling, so it stays awake automatically!

If you notice issues, add a free uptime monitor:
1. Go to [uptimerobot.com](https://uptimerobot.com) (free)
2. Add monitor → HTTP(s)
3. URL: `https://your-app.onrender.com/api/stats`
4. Interval: 5 minutes

This pings your bot every 5 min to keep it awake.

## Updating Your Bot

Just push to GitHub - Render auto-deploys!

```bash
git add .
git commit -m "Update"
git push
```

## Troubleshooting

**Bot not responding?**
- Check Render logs: Dashboard → Your Service → Logs
- Verify BOT_TOKEN and ADMIN_CHAT_ID are correct

**Tickets not saving after restart?**
- Free tier doesn't persist files. Add a database for production.
- For small usage, this is fine - tickets stay in memory while running.
