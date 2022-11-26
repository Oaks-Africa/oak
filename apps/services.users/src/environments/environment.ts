export const environment = {
  production: false,
  app: {
    port: parseInt(process.env.SERVICES_USERS_APP_PORT, 10),
    name: process.env.SERVICES_USERS_APP_NAME,
    domain: process.env.SERVICES_USERS_APP_DOMAIN,
    url: `${process.env.SERVICES_USERS_APP_DOMAIN}:${parseInt(
      process.env.SERVICES_USERS_APP_PORT,
      10
    )}`,
    package: 'users',
    httpPort: parseInt(process.env.SERVICES_USERS_APP_HTTP_PORT, 10),
  },
  database: {
    type: process.env.SERVICES_USERS_DATABASE_TYPE as 'mongo',
    clientUrl: process.env.SERVICES_USERS_DATABASE_CLIENT_URL,
    dbName: process.env.SERVICES_USERS_DATABASE_NAME,
    autoLoadEntities: true,
    ensureIndexes: true,
  },
  temporal: {
    address: process.env.TEMPORAL_ADDRESS,
    taskQueue: process.env.TEMPORAL_TASK_QUEUE,
    namespace: process.env.TEMPORAL_NAMESPACE,
    workflowsPath: process.env.TEMPORAL_WORKFLOWS_PATH,
    worker: {
      name: process.env.TEMPORAL_WORKER_NAME,
    },
  },
};
