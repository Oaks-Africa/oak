import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import { AuthState, AuthQuery, AuthService } from '@oak/auth/data-access';
import { RouterLinkWithHref } from "@angular/router";

import { TuiAlertService } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';


@Component({
  selector: 'oak-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref,
    TuiIslandModule,
    SignInFormComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  isLoading$!: Observable<boolean>;
  error$!: Observable<any>;
  allState$!: Observable<AuthState>;

  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private readonly authQuery: AuthQuery,
    private readonly authService: AuthService
  ) {
    this.isLoading$ = this.authQuery.selectLoading();
    this.error$ = this.authQuery.selectError();
    this.allState$ = this.authQuery.allState$;
  }

  onSignInViaEmail(data: any) {
    console.log("SIGN IN DATA", data)
    // this.alertService
    //   .open('User has sign in successfull', {label: 'Sign in form'})
    //   .subscribe()
    // this.authService.signInViaEmail(data.email, data.password)
    // this.authService.signInViaEmail('pand@gmail.com', 'aBcdef12#$#$');
  }
}
