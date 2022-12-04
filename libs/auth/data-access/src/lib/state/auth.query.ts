import { Injectable } from '@angular/core';

import { QueryEntity } from '@datorama/akita';

import { AuthStore, AuthState } from './auth.store';

@Injectable()
export class AuthQuery extends QueryEntity<AuthState> {
  allState$ = this.select();

  constructor(protected override store: AuthStore) {
    super(store);
  }
}
