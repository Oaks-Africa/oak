export const environment = {
  production: false,
  app: {
    port: parseInt(process.env.GATEWAYS_USERS_APP_PORT, 10) || 3001,
    name: process.env.GATEWAYS_USERS_APP_NAME,
    domain: process.env.GATEWAYS_USERS_APP_DOMAIN,
    allowedDomains: process.env.GATEWAYS_USERS_APP_ALLOWED_DOMAINS?.split(','),
  },
  redis: {
    cache: {
      host: process.env.GATEWAYS_USERS_REDIS_CACHE_HOST,
      port: parseInt(process.env.GATEWAYS_USERS_REDIS_CACHE_PORT, 10),
      db: parseInt(process.env.GATEWAYS_USERS_REDIS_CACHE_DB, 10),
      url: `${process.env.GATEWAYS_USERS_REDIS_CACHE_HOST}:${parseInt(
        process.env.GATEWAYS_USERS_REDIS_CACHE_PORT,
        10
      )}`,
    },
  },
  google: {
    client: {
      id: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
    },
    redirectUrl: process.env.GOOGLE_REDIRECT_URL,
  },
  jwt: {
    secret: process.env.GATEWAYS_USERS_JWT_SECRET,
    ignoreExpiration:
      process.env.GATEWAYS_USERS_JWT_IGNORE_EXPIRATION === 'true',
    signOptions: {
      expiresIn: process.env.GATEWAYS_USERS_JWT_SIGN_OPTIONS_EXPIRES_IN,
    },
  },
  session: {
    secret: process.env.GATEWAYS_USERS_SESSION_SECRET,
  },
  services: {
    users: {
      url: process.env.NX_SERVICES_USERS_URL,
    },
  },
};
