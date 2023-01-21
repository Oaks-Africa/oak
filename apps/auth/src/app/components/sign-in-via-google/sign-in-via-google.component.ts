import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'oak-sign-in-via-google',
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule
  ],
  templateUrl: './sign-in-via-google.component.html',
  styleUrls: ['./sign-in-via-google.component.scss']
})
export class SignInViaGoogleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
