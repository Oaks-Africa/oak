import { CommonModule } from '@angular/common';
import {
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
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


interface ForgotPasswordForm {
  password: FormControl<string>;
  confirm: FormControl<string>;
}

@Component({
  selector: 'oak-forgot-pasword-form',
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
  ],
  templateUrl: './forgot-pasword-form.component.html',
  styleUrls: ['./forgot-pasword-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPaswordFormComponent implements OnInit {
  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;

  constructor() {
    this.form = new FormGroup<ForgotPasswordForm> ({
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
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitForm.emit(this.form.value);
  }
}
