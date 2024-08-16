module.exports = {
  apps: [
    {
      script: 'npm',
      args: 'start',a
      watch: true,
      autorestart: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
