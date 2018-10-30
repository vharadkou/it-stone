import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialLoginModule,
} from 'angular-6-social-login';

import { AppComponent } from './app.component';
import {
  CardComponent,
  DialogOverviewExampleDialogComponent,
} from 'components';

import {
  FightPageComponent,
  NotFoundPageComponent,
  WelcomePageComponent,
} from 'pages';

import {
  FightService,
  SocketService,
  TimerService,
  UserService,
} from 'services';

import { 
  CardsEffects,
  reducers,
} from 'store';

import { DemoMaterialModule } from './material-module';

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

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'battle', component: FightPageComponent },
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    ),
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([CardsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  declarations: [
    AppComponent,
    CardComponent,
    DialogOverviewExampleDialogComponent,
    WelcomePageComponent,
    FightPageComponent,
    NotFoundPageComponent,
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
