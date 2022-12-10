import { APP_INTERCEPTOR } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { Partitioners } from 'kafkajs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TemporalModule } from 'nestjs-temporal';
import { Connection } from '@temporalio/client';

import { environment } from '../../../environments/environment';

import { NOTIFICATIONS_SERVICE } from '../constants/services.constant';

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
    ClientsModule.register([
      {
        name: NOTIFICATIONS_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: environment.kafka.clientId,
            brokers: [...environment.kafka.brokers],
          },
          consumer: {
            groupId: environment.kafka.consumers.notifications.id,
          },
          producer: {
            createPartitioner: Partitioners.DefaultPartitioner,
          },
        },
      },
    ]),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    TokenGenerationService,
  ],
  exports: [TokenGenerationService, ClientsModule],
})
export class GlobalModule {}
