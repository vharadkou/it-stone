import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import {
  AuthServiceConfig,
  SocialLoginModule,
  GoogleLoginProvider,
} from 'angular-6-social-login';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { DialogOverviewExampleDialogComponent } from './components/add-user-dialog';
import { WelcomePageComponent } from './pages/welcome/welcome.component';

import { TimerService } from './services/timer.service';
import { SocketService } from './services/socket.service';
import { UserService } from './services/user.service';
import { FightService } from './services';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { MatNativeDateModule } from '@angular/material';
import { FightPageComponent } from './pages/fight/fight.component';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found/not-found.component';

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
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundPageComponent }
];

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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    )
  ],
  declarations: [
    AppComponent,
    CardComponent,
    DialogOverviewExampleDialogComponent,
    WelcomePageComponent,
    FightPageComponent,
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
