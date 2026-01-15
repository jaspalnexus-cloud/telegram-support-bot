#!/bin/bash

# ============================================
# Push to GitHub - One Click Script
# ============================================

echo ""
echo "🚀 Pushing Telegram Support Bot to GitHub"
echo ""

# Initialize git
git init 2>/dev/null

# Add all files
git add .

# Commit
git commit -m "Telegram Support Bot - Initial commit"

# Set branch
git branch -M main

# Add remote (your repo)
git remote remove origin 2>/dev/null
git remote add origin https://github.com/jaspalnexus-cloud/telegram-support-bot.git

# Push
echo ""
echo "📤 Pushing to GitHub..."
echo "   (Enter your GitHub username and password/token when prompted)"
echo ""
git push -u origin main

echo ""
echo "✅ Done! Your code is now on GitHub"
echo "   https://github.com/jaspalnexus-cloud/telegram-support-bot"
echo ""
