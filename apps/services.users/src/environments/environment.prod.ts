import { join } from "path";

export const environment = {
  production: true,
  app: {
    port: parseInt(process.env.SERVICES_USERS_APP_PORT, 10),
    name: process.env.SERVICES_USERS_APP_NAME,
    domain: process.env.SERVICES_USERS_APP_DOMAIN,
    url: `${process.env.SERVICES_USERS_APP_DOMAIN}:${parseInt(process.env.SERVICES_USERS_APP_PORT, 10)}`,
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
    taskQueue: process.env.SERVICES_USERS_TEMPORAL_TASK_QUEUE,
    namespace: process.env.TEMPORAL_NAMESPACE,
    workflowsPath: join(
      __dirname?.replace('dist', ''),
      process.env.TEMPORAL_WORKFLOWS_PATH
    ),
    worker: {
      name: process.env.SERVICES_USERS_TEMPORAL_WORKER_NAME,
    },
  },
};
