import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { environment } from '../environments/environment';

import { AuthDataAccessModule } from '@oak/auth/data-access';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AuthDataAccessModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
