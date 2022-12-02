export const environment = {
  production: true,
  app: {
    port: parseInt(process.env.SERVICES_NOTIFICATIONS_APP_PORT, 10) || 3001,
    name: process.env.SERVICES_NOTIFICATIONS_APP_NAME,
    domain: process.env.SERVICES_NOTIFICATIONS_APP_DOMAIN,
  },
};