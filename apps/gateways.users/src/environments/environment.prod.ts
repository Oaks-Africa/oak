export const environment = {
  production: true,
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3001,
    name: process.env.APP_NAME,
    domain: process.env.APP_DOMAIN,
    allowedDomains: process.env.APP_ALLOWED_DOMAINS?.split(','),
  },
  redis: {
    cache: {
      host: process.env.REDIS_CACHE_HOST,
      port: parseInt(process.env.REDIS_CACHE_PORT, 10),
      db: parseInt(process.env.REDIS_CACHE_DB, 10),
      url: `${process.env.REDIS_CACHE_HOST}:${parseInt(
        process.env.REDIS_CACHE_PORT,
        10
      )}`,
    },
  },
  jwt: {
    secret: process.env.MAIN_SERVICE_JWT_SECRET,
    ignoreExpiration: process.env.MAIN_SERVICE_JWT_IGNORE_EXPIRATION === 'true',
    signOptions: {
      expiresIn: process.env.MAIN_SERVICE_JWT_SIGN_OPTIONS_EXPIRES_IN,
    },
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  services: {
    users: {
      url: process.env.NX_SERVICES_USERS_URL,
    },
  },
};
