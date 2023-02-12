import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { TuiRootModule } from '@taiga-ui/core';

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
    BrowserAnimationsModule,
    TuiRootModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
