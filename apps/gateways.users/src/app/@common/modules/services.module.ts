import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { join } from 'path';

import { environment } from '../../../environments/environment';

import {
  USERS_PACKAGE_NAME,
  USERS_SERVICE_NAME,
} from '@oak/services.users/proto';

const usersServiceProvider = {
  provide: USERS_SERVICE_NAME,
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: USERS_PACKAGE_NAME,
        protoPath: join(
          __dirname,
          '../../apps/services.users/assets/proto/users.proto'
        ),
        url: environment.services.users.url,
      },
    });
  },
};

@Global()
@Module({
  imports: [],
  providers: [usersServiceProvider],
  exports: [usersServiceProvider],
})
export class ServicesModule {}
