# 🆓 Free Hosting Options (No Credit Card Required)

Since Oracle Cloud requires credit card verification, here are the best **completely free** alternatives:

---

## ✅ Option 1: Render.com (EASIEST - Recommended!)

### 🎯 Why Choose Render?
- ✅ **No credit card required**
- ✅ Free tier (750 hours/month = 24/7)
- ✅ Auto-deploy from GitHub
- ✅ Easy setup (5 minutes)
- ✅ Automatically restarts on crash
- ❌ Sleeps after 15 min inactivity (wakes up in ~30 seconds)

### 📋 Setup Steps

1. **Create Account**
   - Go to: https://render.com
   - Sign up with GitHub or email (FREE - no card needed!)

2. **Push Code to GitHub**
   ```bash
   cd telegram-support-bot
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/telegram-support-bot.git
   git push -u origin main
   ```

3. **Create Web Service on Render**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `telegram-bot`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `node bot.js`
     - **Instance Type:** `Free`

4. **Add Environment Variables**
   - In Render dashboard → Environment
   - Add:
     ```
     BOT_TOKEN = 8450813088:AAFfDYMa0UEzsIwV2GyvyNXN-1R8Q5PHrSU
     ADMIN_CHAT_ID = 8450813088
     PORT = 10000
     ```

5. **Deploy!**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - ✅ Done! Your bot is live 24/7!

### 📝 Note about Sleep Mode
- Bot sleeps after 15 min of no HTTP requests
- **SOLUTION:** Use a cron job to ping it every 10 minutes (free services available)

---

## ✅ Option 2: Railway.app (Great Alternative)

### 🎯 Why Choose Railway?
- ✅ **No credit card required** (for starter plan)
- ✅ $5 free credits per month
- ✅ Fast deployment
- ✅ No sleep mode!
- ✅ Auto-restarts
- ❌ Limited to $5/month free (usually enough)

### 📋 Setup Steps

1. **Create Account**
   - Go to: https://railway.app
   - Sign up with GitHub (FREE)

2. **Deploy from GitHub**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway auto-detects Node.js

3. **Add Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Add:
     ```
     BOT_TOKEN = 8450813088:AAFfDYMa0UEzsIwV2GyvyNXN-1R8Q5PHrSU
     ADMIN_CHAT_ID = 8450813088
     PORT = 3000
     ```

4. **Deploy!**
   - Click "Deploy"
   - ✅ Your bot is live!

---

## ✅ Option 3: Replit.com (Easiest for Beginners!)

### 🎯 Why Choose Replit?
- ✅ **No credit card, no GitHub needed**
- ✅ Code directly in browser
- ✅ Super easy for beginners
- ✅ Instant deployment
- ❌ Bot sleeps when not active (need Always On for $7/month or use tricks)

### 📋 Setup Steps

1. **Create Account**
   - Go to: https://replit.com
   - Sign up (FREE)

2. **Create New Repl**
   - Click "+ Create Repl"
   - Choose "Node.js"
   - Name: `telegram-bot`

3. **Upload Your Files**
   - Upload `bot.js`
   - Upload `package.json`
   - Create `public` folder and upload widget files

4. **Add Secrets (Environment Variables)**
   - Click 🔒 "Secrets" (left sidebar)
   - Add:
     ```
     BOT_TOKEN = 8450813088:AAFfDYMa0UEzsIwV2GyvyNXN-1R8Q5PHrSU
     ADMIN_CHAT_ID = 8450813088
     PORT = 3000
     ```

5. **Install Dependencies & Run**
   ```bash
   npm install
   node bot.js
   ```

6. **Keep it Alive (Free Trick)**
   - Use UptimeRobot.com to ping your Replit URL every 5 minutes
   - This keeps the bot awake for free!

---

## ✅ Option 4: Glitch.com (Quick & Easy)

### 🎯 Why Choose Glitch?
- ✅ **No credit card required**
- ✅ Code in browser
- ✅ No GitHub needed
- ✅ Quick setup
- ❌ Projects sleep after 5 min inactivity

### 📋 Setup Steps

1. **Create Account**
   - Go to: https://glitch.com
   - Sign up (FREE)

2. **Create New Project**
   - Click "New Project" → "hello-node"

3. **Replace Code**
   - Delete default files
   - Upload your bot files
   - Edit `.env` and add:
     ```
     BOT_TOKEN=8450813088:AAFfDYMa0UEzsIwV2GyvyNXN-1R8Q5PHrSU
     ADMIN_CHAT_ID=8450813088
     PORT=3000
     ```

4. **Click "Show" to Start**
   - Bot will start automatically
   - ✅ Live!

---

## ✅ Option 5: Heroku (Classic Choice)

### 🎯 Why Choose Heroku?
- ✅ Was completely free (now requires card for verification but still free)
- ✅ Most popular platform
- ✅ Professional grade
- ❌ **Now requires credit card verification** (but won't charge)

### 📋 Setup Steps

1. **Create Account**
   - Go to: https://heroku.com
   - Sign up
   - ⚠️ Requires card verification (but free tier available)

2. **Install Heroku CLI**
   ```bash
   # On Windows: Download from heroku.com
   # On Mac: brew install heroku/brew/heroku
   # On Linux: curl https://cli-assets.heroku.com/install.sh | sh
   ```

3. **Deploy**
   ```bash
   cd telegram-support-bot
   heroku login
   heroku create telegram-bot
   
   # Add environment variables
   heroku config:set BOT_TOKEN=8450813088:AAFfDYMa0UEzsIwV2GyvyNXN-1R8Q5PHrSU
   heroku config:set ADMIN_CHAT_ID=8450813088
   
   git push heroku main
   ```

---

## 🏆 My Recommendation for You

### Best Option: **Render.com**

**Why?**
1. ✅ No credit card needed
2. ✅ Easy setup (GitHub integration)
3. ✅ 750 free hours/month (24/7 coverage)
4. ✅ Auto-deploys when you push to GitHub
5. ✅ Professional and reliable

**The only "issue":** Sleeps after 15 min inactivity
**Solution:** Use a free cron job to ping it every 10 minutes

---

## 📊 Quick Comparison

| Platform | No Card? | 24/7? | Ease | Best For |
|----------|----------|-------|------|----------|
| **Render** | ✅ Yes | ⚠️ Sleep* | ⭐⭐⭐⭐⭐ | **Recommended!** |
| **Railway** | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐ | Good alternative |
| **Replit** | ✅ Yes | ⚠️ Sleep* | ⭐⭐⭐⭐⭐ | Beginners |
| **Glitch** | ✅ Yes | ⚠️ Sleep* | ⭐⭐⭐⭐ | Quick tests |
| **Heroku** | ❌ No | ✅ Yes | ⭐⭐⭐ | If you have card |
| **Oracle** | ❌ No | ✅ Yes | ⭐⭐ | Best specs but needs card |

*Can be kept awake with free ping services

---

## 🔄 How to Keep Bots Awake (Free)

If using Render/Replit/Glitch, use these free services to ping your bot:

### Option A: UptimeRobot.com
1. Sign up at https://uptimerobot.com (free)
2. Add "New Monitor"
3. Type: HTTP(s)
4. URL: Your bot's URL
5. Interval: 5 minutes
6. ✅ Done! Bot stays awake 24/7

### Option B: Cron-job.org
1. Sign up at https://cron-job.org (free)
2. Create new cron job
3. URL: Your bot's URL
4. Interval: Every 10 minutes
5. ✅ Done!

### Option C: Koyeb.com
- Another free hosting that doesn't sleep
- No credit card
- EU-based

---

## 🎯 Next Steps - What Should You Do?

### Recommended Path:

1. **Test locally first** (make sure bot works)
   ```bash
   cd telegram-support-bot
   npm install
   cp .env.example .env
   node bot.js
   ```

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create repo on github.com first, then:
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```

3. **Deploy to Render.com**
   - Sign up (no card needed!)
   - Connect GitHub
   - Add environment variables
   - Deploy!

4. **Setup UptimeRobot** (keep bot awake)
   - Ping your Render URL every 10 minutes

---

## 📞 Need Help?

Let me know which option you want to try and I'll guide you through it step by step!
