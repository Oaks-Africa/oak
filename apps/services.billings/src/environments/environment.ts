export const environment = {
  production: false,
  app: {
    port: parseInt(process.env.SERVICES_BILLINGS_APP_PORT, 10) || 3001,
    name: process.env.SERVICES_BILLINGS_APP_NAME,
    domain: process.env.SERVICES_BILLINGS_APP_DOMAIN,
  },
};
