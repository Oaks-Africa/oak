import { APP_INTERCEPTOR } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TemporalModule } from 'nestjs-temporal';

import { environment } from '../../../environments/environment';

import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { Example } from '../../example.entity';

console.log(environment.database)
@Global()
@Module({
  imports: [
    MikroOrmModule.forRoot({ ...environment.database, entities: [Example] }),
    TemporalModule.forRoot(
      {
        taskQueue: environment.temporal.taskQueue,
        workflowsPath: environment.temporal.workflowsPath,
        namespace: environment.temporal.namespace,
      },
      {
        address: environment.temporal.address,
      }
    ),
    TemporalModule.registerClient({
      name: environment.temporal.worker.name,
      connection: {
        address: environment.temporal.address,
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class GlobalModule {}
