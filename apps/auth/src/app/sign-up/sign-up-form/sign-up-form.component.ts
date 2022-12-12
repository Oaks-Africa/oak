import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { TuiButtonModule, TuiErrorModule, TuiHintModule } from '@taiga-ui/core';

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
  ],
  standalone: true,
  selector: 'oaks-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  form!: FormGroup;

  constructor() {
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

  ngOnInit(): void {}

  onSubmit() {}
}
