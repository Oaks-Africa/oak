export const environment = {
  production: true,
  app: {
    port: parseInt(process.env.GATEWAYS_USERS_APP_PORT, 10) || 3001,
    name: process.env.GATEWAYS_USERS_APP_NAME,
    domain: process.env.GATEWAYS_USERS_APP_DOMAIN,
  },
};
