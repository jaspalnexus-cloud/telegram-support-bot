#!/bin/bash

# ============================================
# Telegram Support Bot - Auto Setup Script
# Run this on your Oracle Cloud VM
# ============================================

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     🤖 Telegram Support Bot - Auto Installer               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "❌ Please don't run as root. Run as normal user (ubuntu)."
    exit 1
fi

# Get bot credentials
echo "📝 Enter your bot credentials:"
echo ""
read -p "   Bot Token (from @BotFather): " BOT_TOKEN
read -p "   Your Chat ID (from @userinfobot): " ADMIN_CHAT_ID

if [ -z "$BOT_TOKEN" ] || [ -z "$ADMIN_CHAT_ID" ]; then
    echo "❌ Bot Token and Chat ID are required!"
    exit 1
fi

echo ""
echo "📦 Installing dependencies..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi

# Install PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Install git if not present
if ! command -v git &> /dev/null; then
    sudo apt install -y git
fi

echo ""
echo "🔧 Setting up environment..."

# Add to bashrc
grep -q "BOT_TOKEN" ~/.bashrc || echo "export BOT_TOKEN=\"$BOT_TOKEN\"" >> ~/.bashrc
grep -q "ADMIN_CHAT_ID" ~/.bashrc || echo "export ADMIN_CHAT_ID=\"$ADMIN_CHAT_ID\"" >> ~/.bashrc

# Export for current session
export BOT_TOKEN="$BOT_TOKEN"
export ADMIN_CHAT_ID="$ADMIN_CHAT_ID"

# Create logs directory
mkdir -p logs

echo ""
echo "📦 Installing npm packages..."
npm install --production

echo ""
echo "🔥 Opening firewall..."
sudo iptables -I INPUT -p tcp --dport 3001 -j ACCEPT || true
sudo netfilter-persistent save 2>/dev/null || true

echo ""
echo "🚀 Starting bot with PM2..."

# Stop existing if running
pm2 delete support-bot 2>/dev/null || true

# Start bot
pm2 start ecosystem.config.js

# Save PM2 config
pm2 save

# Setup auto-start on reboot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     ✅ INSTALLATION COMPLETE!                              ║"
echo "╠════════════════════════════════════════════════════════════╣"
echo "║  Your bot is now running 24/7!                             ║"
echo "║                                                            ║"
echo "║  Commands:                                                 ║"
echo "║    pm2 status    - Check bot status                        ║"
echo "║    pm2 logs      - View logs                               ║"
echo "║    pm2 restart   - Restart bot                             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Show status
pm2 status
