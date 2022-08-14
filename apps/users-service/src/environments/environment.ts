export const environment = {
  production: false,
  app: {
    port: parseInt(process.env.USERS_APP_PORT, 10) || 3002,
    name: process.env.USERS_APP_NAME,
    domain: process.env.USER_APP_DOMAIN,
  },
  database: {
    type: process.env.USERS_DATABASE_TYPE,
    host: process.env.USERS_DATABASE_HOST,
    port: parseInt(process.env.USERS_DATABASE_PORT, 10),
    database: process.env.USERS_DATABASE_NAME,
    username: process.env.USERS_DATABASE_USERNAME,
    password: process.env.USERS_DATABASE_PASSWORD,
    url: process.env.USERS_DATABASE_URL,
  },
  cache: {
    host: process.env.USERS_CACHE_HOST,
    port: parseInt(process.env.USERS_CACHE_PORT, 10),
    username: process.env.USERS_CACHE_USERNAME,
    password: process.env.USERS_CACHE_PASSWORD,
    db: parseInt(process.env.USERS_CACHE_DB, 10),
  },
  queue: {
    host: process.env.USERS_QUEUE_HOST,
    port: parseInt(process.env.USERS_QUEUE_PORT, 10),
    username: process.env.USERS_QUEUE_USERNAME,
    password: process.env.USERS_QUEUE_PASSWORD,
    db: parseInt(process.env.USERS_QUEUE_DB, 10),
    prefix: process.env.USERS_QUEUE_PREFIX,
  },
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
    ignoreExpiration: Boolean(process.env.AUTH_JWT_IGNORE_EXPIRATION),
    signOptions: {
      expiresIn: process.env.AUTH_JWT_SIGN_OPTIONS_EXPIRES_IN,
    },
  },
  clients: {
    auth: {
      url: `${process.env.AUTH_APP_DOMAIN}:${parseInt(
        process.env.AUTH_APP_PORT,
        10
      )}`,
    },
  },
};
