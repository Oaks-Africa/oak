import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

import { Observable } from 'rxjs';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiAlertService } from '@taiga-ui/core';

import { AuthQuery, AuthService, AuthState } from '@oak/auth/data-access';

import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

@Component({
  selector: 'oak-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    TuiIslandModule,
    RouterLinkWithHref,
    SignUpFormComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
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

  // onSubmit() {
  //   this.authService.signUpViaEmail(this.form.getRawValue());

  //   this.alertService
  //     .open('User has been created successfully', { label: 'Sign up form' })
  //     .subscribe();
  // }
}
