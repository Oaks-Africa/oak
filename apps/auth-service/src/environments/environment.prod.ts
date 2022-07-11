export const environment = {
  production: true,
  app: {
    port: process.env.AUTH_APP_PORT,
    name: process.env.AUTH_APP_NAME,
  },
  database: {
    host: process.env.AUTH_DATABASE_HOST,
    port: parseInt(process.env.AUTH_DATABASE_PORT, 10) || 5432,
    name: process.env.AUTH_DATABASE_NAME,
    username: process.env.AUTH_DATABASE_USERNAME,
    password: process.env.AUTH_DATABASE_PASSWORD
  },
  cache: {
    host: process.env.AUTH_CACHE_HOST,
    port: process.env.AUTH_CACHE_PORT,
    username: process.env.AUTH_CACHE_PASSWORD,
    password: process.env.AUTH_CACHE_PASSWORD,
    db: process.env.AUTH_CACHE_DB,
  },
  queue: {
    host: process.env.AUTH_QUEUE_HOST,
    port: process.env.AUTH_QUEUE_PORT,
    username: process.env.AUTH_QUEUE_PASSWORD,
    password: process.env.AUTH_QUEUE_PASSWORD,
    db: process.env.AUTH_QUEUE_DB,
  },
};
