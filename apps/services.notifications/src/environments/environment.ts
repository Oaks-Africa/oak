export const environment = {
  production: false,
  app: {
    port: parseInt(process.env.SERVICES_NOTIFICATIONS_APP_PORT, 10) || 3001,
    httpPort: parseInt(process.env.SERVICES_NOTIFICATIONS_APP_HTTP_PORT, 10),
    name: process.env.SERVICES_NOTIFICATIONS_APP_NAME,
    domain: process.env.SERVICES_NOTIFICATIONS_APP_DOMAIN,
  },
  database: {
    type: process.env.SERVICES_NOTIFICATIONS_DATABASE_TYPE as 'mongo',
    clientUrl: process.env.SERVICES_NOTIFICATIONS_DATABASE_CLIENT_URL,
    dbName: process.env.SERVICES_NOTIFICATIONS_DATABASE_NAME,
    autoLoadEntities: true,
    ensureIndexes: true,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
  },
  kafka: {
    clientId: process.env.SERVICES_NOTIFICATIONS_KAFKA_CLIENT_ID,
    brokers: process.env.KAFKA_BROKERS?.split(','),
    consumers: {
      notifications: {
        id: process.env.KAFKA_CONSUMERS_NOTIFICATIONS_ID,
      },
    },
  },
};
