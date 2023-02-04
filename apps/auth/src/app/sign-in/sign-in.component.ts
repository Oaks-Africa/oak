import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import { AuthState, AuthQuery, AuthService } from '@oak/auth/data-access';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'oak-sign-in',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  isLoading$!: Observable<boolean>;
  error$!: Observable<any>;
  allState$!: Observable<AuthState>;

  constructor(
    private readonly authQuery: AuthQuery,
    private readonly authService: AuthService
  ) {
    this.isLoading$ = this.authQuery.selectLoading();
    this.error$ = this.authQuery.selectError();
    this.allState$ = this.authQuery.allState$;
  }

  onSignInViaEmail() {
    this.authService.signInViaEmail('pand@gmail.com', 'aBcdef12#$#$');
  }
}
