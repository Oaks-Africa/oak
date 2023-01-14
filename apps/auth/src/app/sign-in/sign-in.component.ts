import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import { AuthState, AuthQuery, AuthService } from '@oak/auth/data-access';
import { RouterLinkWithHref } from "@angular/router";

import { 
  FormControl, 
  FormGroup, 
  FormsModule,
  ReactiveFormsModule,
  Validators 
} from '@angular/forms';

import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule
} from '@taiga-ui/kit';
import { 
  TuiButtonModule, 
  TuiErrorModule, 
  TuiHintModule,
  TuiAlertService 
} from '@taiga-ui/core';

interface SignInForm {
  email: FormControl<string>
  password: FormControl<string>
}

@Component({
  selector: 'oak-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiIslandModule,
    TuiButtonModule,
    TuiHintModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  isLoading$!: Observable<boolean>;
  error$!: Observable<any>;
  allState$!: Observable<AuthState>;
  form: FormGroup;

  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private readonly authQuery: AuthQuery,
    private readonly authService: AuthService
  ) {
    this.isLoading$ = this.authQuery.selectLoading();
    this.error$ = this.authQuery.selectError();
    this.allState$ = this.authQuery.allState$;
    this.form = new FormGroup<SignInForm>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
          Validators.maxLength(100),
        ],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern(
          //   /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          // ),
        ],
      }),
    })

  }

  onSignInViaEmail() {
    console.log(this.form.value)
    let data = this.form.value
    this.alertService
      .open('User has sign in successfull', {label: 'Sign in form'})
      .subscribe()
    this.authService.signInViaEmail(data.email, data.password)
    // ('pand@gmail.com', 'aBcdef12#$#$');
  }
}
