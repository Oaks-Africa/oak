import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { AuthState, AuthQuery, AuthService } from '@oak/auth/data-access';
import { TuiAlertService } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { ForgotPaswordFormComponent } from './forgot-pasword-form/forgot-pasword-form.component';

@Component({
  selector: 'oak-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    TuiIslandModule,
    RouterLinkWithHref,
    ForgotPaswordFormComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
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

  ngOnInit(): void {
  }

  onForgotPasswordFormSubmit(data: any) {
    console.log('FORGET PASSWORD PAGE COMPONENT', data);
  }
}

