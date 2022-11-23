export const environment = {
  production: true,
  app: {
    port: parseInt(process.env.GATEWAYS_USERS_APP_PORT, 10) || 3001,
    name: process.env.GATEWAYS_USERS_APP_NAME,
    domain: process.env.GATEWAYS_USERS_APP_DOMAIN,
  },
  redis: {
    cache: {
      host: process.env.GATEWAYS_USERS_REDIS_CACHE_HOST,
      port: parseInt(process.env.GATEWAYS_USERS_REDIS_CACHE_PORT, 10),
      db: parseInt(process.env.GATEWAYS_USERS_REDIS_CACHE_DB, 10),
    },
  },
  jwt: {
    secret: process.env.MAIN_SERVICE_JWT_SECRET,
    ignoreExpiration: process.env.MAIN_SERVICE_JWT_IGNORE_EXPIRATION === 'true',
    signOptions: {
      expiresIn: process.env.MAIN_SERVICE_JWT_SIGN_OPTIONS_EXPIRES_IN,
    },
  },
};
