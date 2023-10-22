require('dotenv').config({ path: './.env' });

module.exports = {
  apps: [
    {
      name: 'app',
      script: 'dist/src/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      time: true,
      env: {
        NODE_ENV: 'production',
        POKEMON_BASE_URL: process.env.POKEMON_BASE_URL,
        MONGODB_URL: process.env.MONGODB_URL,
        JWT_SECRET: process.env.JWT_SECRET
      }
    }
  ]
};
