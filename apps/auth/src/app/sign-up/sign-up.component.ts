import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiErrorModule,
  TuiHintModule,
} from '@taiga-ui/core';
import { AuthQuery, AuthService, AuthState } from '@oak/auth/data-access';
import { Observable } from 'rxjs';
import { RouterLinkWithHref } from '@angular/router';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

interface NameForm {
  first: FormControl<string>;
  last: FormControl<string>;
  other: FormControl<string | null>;
}

interface SignUpForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirm: FormControl<string>;
  name: FormGroup<NameForm>;
}

@Component({
  selector: 'oak-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiHintModule,
    RouterLinkWithHref,
    SignUpFormComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  form!: FormGroup;

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

    this.form = new FormGroup<SignUpForm>({
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
          Validators.pattern(
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          ),
        ],
      }),
      confirm: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          ),
        ],
      }),
      name: new FormGroup({
        first: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        last: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        other: new FormControl('', { nonNullable: false }),
      }),
    });
  }

  onSubmit() {
    this.authService.signUpViaEmail(this.form.getRawValue());

    this.alertService
      .open('User has been created successfully', { label: 'Sign up form' })
      .subscribe();
  }
}
