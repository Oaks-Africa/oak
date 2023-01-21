import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';

import { 
  TuiButtonModule, 
  TuiErrorModule, 
  TuiHintModule,
} from '@taiga-ui/core';

import { 
  FormControl, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';

interface SignInForm {
  email: FormControl<string>
  password: FormControl<string>
}

@Component({
  selector: 'oak-sign-in-form',
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
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent implements OnInit {
  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;

  constructor() {
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
        ],
      }),
    })
   }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.submitForm.emit(this.form.value);
  }
}
