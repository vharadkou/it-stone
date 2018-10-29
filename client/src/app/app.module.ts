import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

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
import { UserService } from './services/user.service';
import { DialogOverviewExampleDialogComponent } from './add-user-dialog/add-user-dialog.component';

import { DemoMaterialModule } from './material-module';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FightService } from './services';
import { reducers } from 'store/store.config';
import {CardsEffects} from 'store/cards';

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
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([CardsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  declarations: [
    AppComponent,
    SigninComponent,
    CardComponent,
    DialogOverviewExampleDialogComponent,
  ],
  entryComponents: [
    DialogOverviewExampleDialogComponent,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    TimerService,
    SocketService,
    FightService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
