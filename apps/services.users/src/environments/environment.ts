import { join } from 'path';

export const environment = {
  production: false,
  app: {
    port: parseInt(process.env.APP_PORT, 10),
    name: process.env.APP_NAME,
    domain: process.env.APP_DOMAIN,
    url: `${process.env.APP_DOMAIN}:${parseInt(process.env.APP_PORT, 10)}`,
    package: 'users',
    httpPort: parseInt(process.env.APP_HTTP_PORT, 10),
  },
  database: {
    type: process.env.DATABASE_TYPE as 'mongo',
    clientUrl: process.env.DATABASE_CLIENT_URL,
    dbName: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    ensureIndexes: true,
  },
  temporal: {
    address: process.env.TEMPORAL_ADDRESS,
    taskQueue: process.env.TEMPORAL_TASK_QUEUE,
    namespace: process.env.TEMPORAL_NAMESPACE,
    workflowsPath: join(
      __dirname?.replace('dist', ''),
      process.env.TEMPORAL_WORKFLOWS_PATH
    ),
    worker: {
      name: process.env.TEMPORAL_WORKER_NAME,
    },
  },
};
