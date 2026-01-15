/**
 * Telegram Support Widget - Embed Script
 * 
 * Add this to your website:
 * <script src="https://yourserver.com/widget-embed.js" data-bot="YOUR_BOT_USERNAME"></script>
 */

(function() {
    // Get bot username from script tag
    const script = document.currentScript;
    const botUsername = script.getAttribute('data-bot') || 'YOUR_BOT_USERNAME';
    const primaryColor = script.getAttribute('data-color') || '#0088cc';
    const position = script.getAttribute('data-position') || 'right'; // 'left' or 'right'
    const message = script.getAttribute('data-message') || '💬 Need help?';
    
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
        .tg-support-btn {
            position: fixed;
            bottom: 24px;
            ${position}: 24px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: ${primaryColor};
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s, box-shadow 0.2s;
            z-index: 99999;
        }
        .tg-support-btn:hover {
            transform: scale(1.1);
        }
        .tg-support-btn svg {
            width: 28px;
            height: 28px;
            fill: white;
        }
        .tg-support-tooltip {
            position: fixed;
            bottom: 94px;
            ${position}: 24px;
            background: white;
            padding: 12px 16px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            font-size: 14px;
            color: #333;
            z-index: 99998;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            animation: tgFadeIn 0.3s;
        }
        @keyframes tgFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tg-support-tooltip';
    tooltip.textContent = message;
    document.body.appendChild(tooltip);
    
    // Hide tooltip after 5 seconds
    setTimeout(() => { tooltip.style.display = 'none'; }, 5000);
    
    // Create button
    const btn = document.createElement('button');
    btn.className = 'tg-support-btn';
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.74 3.98-1.73 6.64-2.87 7.97-3.43 3.79-1.57 4.58-1.85 5.09-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/></svg>`;
    btn.onclick = () => window.open(`https://t.me/${botUsername}`, '_blank');
    document.body.appendChild(btn);
})();
