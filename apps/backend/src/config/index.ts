export default () => ({
  environment: process.env.NODE_ENV || `development`,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  },
  apps: {
    web: process.env.WEB_CLIENT_URL,
  },
});
