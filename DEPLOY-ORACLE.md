# 🚀 Deploy to Oracle Cloud (FREE Forever)

Oracle Cloud offers **always-free** VMs that never expire. Perfect for 24/7 bots!

## What You Get (FREE)

- ✅ 1-4 CPU cores
- ✅ 1-24 GB RAM  
- ✅ 50 GB storage
- ✅ 10 TB bandwidth/month
- ✅ Never expires, never sleeps

---

## 📋 BEFORE YOU START - Get Telegram Credentials

You need **2 things from Telegram**:

### 1️⃣ Bot Token (from @BotFather)
1. Open Telegram → Search **@BotFather**
2. Send `/newbot` to create your bot
3. Follow instructions (choose name and username)
4. **COPY THE TOKEN** 
   - Looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
   - This is your `BOT_TOKEN`

### 2️⃣ Your Chat ID (from @userinfobot)  
1. Open Telegram → Search **@userinfobot**
2. Send any message (like "hi")
3. **COPY YOUR ID NUMBER**
   - Looks like: `123456789`
   - This is your `ADMIN_CHAT_ID`

📖 **Detailed guide with screenshots:** See `TELEGRAM-SETUP-GUIDE.md`

✅ **Once you have both credentials, continue below!**

---

## Step 1: Create Oracle Cloud Account

1. Go to [cloud.oracle.com](https://cloud.oracle.com)
2. Click **"Sign Up"**
3. Fill in your details
4. **Credit card required** (for verification only - you won't be charged)
5. Select your home region (choose closest to your users)

⚠️ **Important:** Oracle may take 1-24 hours to approve your account.

---

## Step 2: Create Free VM

1. Login to Oracle Cloud Console
2. Click **☰ Menu** → **Compute** → **Instances**
3. Click **"Create Instance"**

### Configure:

**Name:** `telegram-bot`

**Image:** 
- Click "Edit" → "Change Image"
- Select **"Ubuntu"** → **"22.04 Minimal"**

**Shape (IMPORTANT - FREE):**
- Click "Edit" → "Change Shape"
- Select **"Ampere"** (ARM processor)
- Choose **"VM.Standard.A1.Flex"**
- OCPUs: **1** (can use up to 4 free)
- Memory: **6 GB** (can use up to 24 free)

**Networking:**
- Use defaults (new VCN)

**SSH Key:**
- Select **"Generate a key pair for me"**
- Click **"Save Private Key"** ← IMPORTANT! Save this file!

4. Click **"Create"**

Wait 2-3 minutes for VM to be ready (status: RUNNING)

---

## Step 3: Connect to Your Server

### On Windows:
1. Download [PuTTY](https://putty.org)
2. Use PuTTYgen to convert the .key file to .ppk
3. Connect using PuTTY with your VM's public IP

### On Mac/Linux:
```bash
# Set permissions
chmod 400 ~/Downloads/ssh-key-*.key

# Connect (replace with your VM's public IP)
ssh -i ~/Downloads/ssh-key-*.key ubuntu@YOUR_VM_IP
```

---

## Step 4: Install Node.js & Bot

Once connected to your server, run these commands:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (keeps bot running forever)
sudo npm install -g pm2

# Create bot directory
mkdir ~/telegram-bot && cd ~/telegram-bot

# Download bot files (or use git)
# Option A: Clone from GitHub
git clone https://github.com/YOUR_USERNAME/telegram-support-bot.git .

# Option B: Create files manually (copy-paste from your local files)
nano bot.js
# Paste the bot.js content, save with Ctrl+X, Y, Enter

nano package.json  
# Paste the package.json content

# Install dependencies
npm install
```

---

## Step 5: Configure Bot

```bash
# Set environment variables
nano ~/.bashrc

# Add these lines at the bottom:
export BOT_TOKEN="your_bot_token_here"
export ADMIN_CHAT_ID="your_chat_id_here"

# Save and reload
source ~/.bashrc
```

---

## Step 6: Open Firewall (Oracle)

Back in Oracle Cloud Console:

1. Go to **Networking** → **Virtual Cloud Networks**
2. Click your VCN → **Security Lists** → **Default Security List**
3. Click **"Add Ingress Rules"**
4. Add rule:
   - Source CIDR: `0.0.0.0/0`
   - Destination Port: `3001`
   - Description: `Bot Web API`
5. Click **"Add"**

Also on the server:
```bash
sudo iptables -I INPUT -p tcp --dport 3001 -j ACCEPT
sudo netfilter-persistent save
```

---

## Step 7: Start Bot with PM2

```bash
cd ~/telegram-bot

# Start bot with PM2
pm2 start bot.js --name "support-bot"

# Save PM2 config (auto-start on reboot)
pm2 save
pm2 startup
# Run the command it shows you (starts with sudo)

# Check status
pm2 status
pm2 logs support-bot
```

---

## 🎉 Done!

Your bot is now running 24/7!

**Useful PM2 Commands:**
```bash
pm2 status          # Check if running
pm2 logs            # View logs
pm2 restart all     # Restart bot
pm2 stop all        # Stop bot
```

**Your bot API:** `http://YOUR_VM_IP:3001/api/stats`

---

## Troubleshooting

**Can't create free VM?**
- Oracle has limited free capacity per region
- Try different shapes or wait and retry
- Try "Always Free Eligible" filter

**Bot not responding?**
- Check logs: `pm2 logs`
- Verify token: `echo $BOT_TOKEN`
- Test locally: `node bot.js`

**Can't connect via SSH?**
- Check VM is RUNNING in Oracle console
- Verify you're using correct IP (Public IP, not Private)
- Check SSH key path

**Port not accessible?**
- Check Oracle Security List rules
- Check iptables: `sudo iptables -L`
