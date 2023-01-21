import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'oak-sign-up-via-google',
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule
  ],
  templateUrl: './sign-up-via-google.component.html',
  styleUrls: ['./sign-up-via-google.component.scss']
})
export class SignUpViaGoogleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
