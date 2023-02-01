import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'oak-sign-x-via-google',
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule
  ],
  templateUrl: './sign-x-via-google.component.html',
  styleUrls: ['./sign-x-via-google.component.scss']
})
export class SignXViaGoogleComponent implements OnInit {
  @Input() x = 'In' 
  constructor() { }

  ngOnInit(): void {
  }

}
