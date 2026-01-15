module.exports = {
  apps: [{
    name: 'support-bot',
    script: 'bot.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      BOT_TOKEN: process.env.BOT_TOKEN,
      ADMIN_CHAT_ID: process.env.ADMIN_CHAT_ID,
      WEB_PORT: 3001
    },
    // Restart if crashes
    exp_backoff_restart_delay: 100,
    // Logs
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: 'logs/error.log',
    out_file: 'logs/output.log',
    merge_logs: true
  }]
};
