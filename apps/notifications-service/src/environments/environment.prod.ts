export const environment = {
  production: true,
  app: {
    port: parseInt(process.env.NOTIFICATIONS_APP_PORT, 10) || 3003,
    name: process.env.NOTIFICATIONS_APP_NAME,
    domain: process.env.NOTIFICATIONS_APP_DOMAIN
  },
  database: {
    type: process.env.NOTIFICATIONS_DATABASE_TYPE,
    host: process.env.NOTIFICATIONS_DATABASE_HOST,
    port: parseInt(process.env.NOTIFICATIONS_DATABASE_PORT, 10),
    database: process.env.NOTIFICATIONS_DATABASE_NAME,
    username: process.env.NOTIFICATIONS_DATABASE_USERNAME,
    password: process.env.NOTIFICATIONS_DATABASE_PASSWORD,
    url: process.env.NOTIFICATIONS_DATABASE_URL
  },
  cache: {
    host: process.env.NOTIFICATIONS_CACHE_HOST,
    port: parseInt(process.env.NOTIFICATIONS_CACHE_PORT, 10),
    username: process.env.NOTIFICATIONS_CACHE_USERNAME,
    password: process.env.NOTIFICATIONS_CACHE_PASSWORD,
    db: parseInt(process.env.NOTIFICATIONS_CACHE_DB, 10)
  },
  queue: {
    host: process.env.NOTIFICATIONS_QUEUE_HOST,
    port: parseInt(process.env.NOTIFICATIONS_QUEUE_PORT, 10),
    username: process.env.NOTIFICATIONS_QUEUE_USERNAME,
    password: process.env.NOTIFICATIONS_QUEUE_PASSWORD,
    db: parseInt(process.env.NOTIFICATIONS_QUEUE_DB, 10),
    prefix: process.env.NOTIFICATIONS_QUEUE_PREFIX
  },
  bus: {
    rabbitmq: {
      url: process.env.NOTIFICATIONS_BUS_RABBITMQ_URL,
      exchanges: {
        notifications: {
          name: "notifications",
          type: "topic"
        }
      }
    }
  }
};
