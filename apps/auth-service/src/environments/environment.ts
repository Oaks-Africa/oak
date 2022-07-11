export const environment = {
  production: false,
  app: {
    port: parseInt(process.env.AUTH_APP_PORT, 10) || 3001,
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
    port: parseInt(process.env.AUTH_CACHE_PORT, 10),
    username: process.env.AUTH_CACHE_USERNAME,
    password: process.env.AUTH_CACHE_PASSWORD,
    db: parseInt(process.env.AUTH_CACHE_DB, 10),
  },
  queue: {
    host: process.env.AUTH_QUEUE_HOST,
    port: parseInt(process.env.AUTH_QUEUE_PORT, 10),
    username: process.env.AUTH_QUEUE_USERNAME,
    password: process.env.AUTH_QUEUE_PASSWORD,
    db: parseInt(process.env.AUTH_QUEUE_DB, 10),
    prefix: process.env.AUTH_QUEUE_PREFIX,
  },
};
