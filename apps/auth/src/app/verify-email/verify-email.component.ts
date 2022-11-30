import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oak-verify-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent {}
