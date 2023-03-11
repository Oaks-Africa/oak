import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'oak-google-auth-button',
  standalone: true,
  imports: [CommonModule, SocialLoginModule, TuiButtonModule],
  providers: [
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '701577720497-6kdmmja8g25303mb15q691p8890avi5q.apps.googleusercontent.com',
            ),
          },
        ],
        onError: (err) => {
          console.error(err, 'fine world');
        },
      } as SocialAuthServiceConfig,
    },
  ],
  template: `
    <asl-google-signin-button
      type="icon"
      size="medium"
      [text]="actionText"
    ></asl-google-signin-button>
  `,
  styleUrls: ['./google-auth-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleAuthButtonComponent implements OnInit {
  @Input() set action(action: string) {
    this.actionText = action === 'up' ? 'signup_with' : 'signin_with';
  }

  actionText!: 'signup_with' | 'signin_with';

  constructor(private readonly socialAuth: SocialAuthService) {}

  ngOnInit(): void {
    this.socialAuth.authState.subscribe((user) =>
      console.log(user, 'USER FROM AUTH STATE')
    );
  }
}
