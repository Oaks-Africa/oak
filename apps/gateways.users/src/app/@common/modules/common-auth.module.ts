import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { GqlCookieAuthGuard } from '../guards/gql-cookie-auth.guard';

@Global()
@Module({
  imports: [PassportModule],
  providers: [GqlAuthGuard, GqlCookieAuthGuard],
  exports: [GqlAuthGuard, GqlCookieAuthGuard, PassportModule],
})
export class CommonAuthModule {}
