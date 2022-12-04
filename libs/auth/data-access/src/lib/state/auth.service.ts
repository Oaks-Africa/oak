import { Injectable } from '@angular/core';

import { Apollo, ApolloBase } from 'apollo-angular';
import { finalize } from 'rxjs/operators';

import { SIGN_IN_VIA_EMAIL } from '../gql/auth.gql';

import { AuthStore } from './auth.store';

@Injectable()
export class AuthService {
  private apollo: ApolloBase;

  constructor(
    private readonly authStore: AuthStore,
    private readonly apolloProvider: Apollo
  ) {
    this.apollo = this.apolloProvider.use('usersGateway');
  }

  signInViaEmail(email: string, password: string) {
    this.authStore.setLoading(true);
    this.apollo
      .mutate({
        mutation: SIGN_IN_VIA_EMAIL,
        variables: {
          signInViaEmailInput: {
            email,
            password,
          },
        },
      })
      .pipe(finalize(() => this.authStore.setLoading(false)))
      .subscribe({
        next: ({ data }) =>
          this.authStore.update((state) => ({
            user: (data as any).signInViaEmail?.user,
          })),
        error: (error) => this.authStore.setError(error.message),
      });
  }
}
