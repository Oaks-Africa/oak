import { APP_INTERCEPTOR } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TemporalModule } from 'nestjs-temporal';
import { Connection } from '@temporalio/client';

import { environment } from '../../../environments/environment';

import { Example } from '../../example.entity';

import { TokenGenerationService } from '../services/token-generation.service';

import { TransformInterceptor } from '../interceptors/transform.interceptor';

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
    TemporalModule.registerClientAsync({
      useFactory: async () => {
        const connection = await Connection.connect({
          address: environment.temporal.address,
        });

        return {
          name: environment.temporal.worker.name,
          namespace: environment.temporal.namespace,
          connection,
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    TokenGenerationService,
  ],
  exports: [TokenGenerationService],
})
export class GlobalModule {}
