# 🎯 Render.com Deployment - Form Answers

Fill in the form on Render.com with these values:

---

## Basic Settings

### Name
```
telegram-support-bot
```
✅ This is fine! Keep it as is (or change to anything you like)

### Language
```
Node
```
⚠️ **IMPORTANT:** Don't select Docker! Select **Node**

### Branch
```
main
```
✅ Keep as "main" (this is your GitHub branch)

### Region
```
Oregon (US West)
```
✅ Keep this (or choose closest to your location)
- US West (Oregon)
- US East (Ohio) 
- Frankfurt (Europe)
- Singapore (Asia)

### Root Directory
```
(Leave EMPTY)
```
✅ Don't enter anything here - your code is at repository root

---

## Instance Type

### ⚠️ IMPORTANT: Select FREE

```
✅ Free - $0/month
   512 MB RAM
   0.1 CPU
```

**Select this one!** ⬆️

❌ Don't select:
- Starter ($7/month)
- Standard ($25/month)
- Pro, Pro Plus, etc.

The FREE tier is perfect for your Telegram bot!

---

## Next: Build & Start Commands

After clicking "Create Web Service", you'll see:

### Build Command
```
npm install
```

### Start Command
```
node bot.js
```

### Port (Auto-detect)
Render will auto-detect port 3000 from your code.
If asked, use: `10000`

---

## Next: Environment Variables

After deployment starts, go to "Environment" tab and add:

```
BOT_TOKEN = 8450813088:AAFfDYMa0UEzsIwV2GyvyNXN-1R8Q5PHrSU
ADMIN_CHAT_ID = 8450813088
PORT = 10000
```

Click "Save Changes" after adding each variable.

---

## ✅ Summary - Quick Copy/Paste

```
Name: telegram-support-bot
Language: Node
Branch: main
Region: Oregon (US West)
Root Directory: (empty)
Instance Type: Free - $0/month

Build Command: npm install
Start Command: node bot.js

Environment Variables:
- BOT_TOKEN = 8450813088:AAFfDYMa0UEzsIwV2GyvyNXN-1R8Q5PHrSU
- ADMIN_CHAT_ID = 8450813088
- PORT = 10000
```

---

## 🎉 After Deployment

1. Wait 2-3 minutes for deployment to complete
2. You'll see "Live" status with a green dot
3. Open Telegram and message your bot!
4. Test with `/start` and send a message

---

## ⚠️ Important Notes

### Sleep Mode
Your bot will sleep after 15 min of no HTTP requests.

**To keep it awake 24/7 (Free):**
1. Go to https://uptimerobot.com
2. Sign up (free)
3. Add "HTTP(s)" monitor
4. Enter your Render URL (from dashboard)
5. Set interval to 5 minutes
6. ✅ Bot stays awake!

### Your Bot URL
After deployment, Render gives you a URL like:
```
https://telegram-support-bot-xxxx.onrender.com
```

Use this URL for:
- UptimeRobot monitoring
- Web widget access (URL/widget.html)

---

## 🆘 Troubleshooting

### Build Failed?
- Check if `package.json` is in your repository
- Make sure you selected "Node" not "Docker"

### Bot not responding in Telegram?
- Check "Logs" tab in Render dashboard
- Verify environment variables are correct
- Make sure BOT_TOKEN has no extra spaces

### Can't find "Node" in Language dropdown?
- Render auto-detects from your repository
- Make sure `package.json` exists
- Try refreshing the page

---

## 📊 What Happens Next?

1. **Render builds your app** (runs `npm install`)
2. **Starts your bot** (runs `node bot.js`)
3. **Assigns a URL** (e.g., https://telegram-support-bot-xxxx.onrender.com)
4. **Bot goes live!** ✅

You'll see in logs:
```
✅ Bot is running...
✅ Admin chat ID: 8450813088
🌐 Widget server: http://localhost:10000
```

---

**Need help with any step? Let me know!** 🚀
