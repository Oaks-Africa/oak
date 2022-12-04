import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { InMemoryCache } from '@apollo/client/core';
import {
  APOLLO_NAMED_OPTIONS,
  ApolloModule,
  NamedOptions,
} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { environment } from '../../../../../apps/auth/src/environments/environment';

import { AuthService, AuthQuery, AuthStore } from './state';

const graphqlEndpointsProvider = {
  provide: APOLLO_NAMED_OPTIONS,
  useFactory(httpLink: HttpLink): NamedOptions {
    return {
      usersGateway: {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: environment.gateways.users.gqlUrl,
        }),
      },
    };
  },
  deps: [HttpLink],
};

@NgModule({
  imports: [CommonModule, ApolloModule, HttpClientModule],
  providers: [graphqlEndpointsProvider, AuthStore, AuthService, AuthQuery],
})
export class AuthDataAccessModule {}
