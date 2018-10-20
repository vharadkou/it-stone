import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from 'angular-6-social-login';

import { SigninComponent } from './signin';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { TimerService } from './services/timer.service';
import { SocketService } from './services/socket.service';

import {DemoMaterialModule} from './material-module';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('109247559839-2osrqa6gnuqovro4kb25hal7mtt8pdj2.apps.googleusercontent.com')
      },
    ]
  );

  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    TimerService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
