import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

import { reducers } from 'store';

import {
  CardsEffects,
  CardsFacade,
  initialState,
} from 'store/cards';

import {
  SkillsEffects,
  SkillsFacade,
  skillsInitialState
} from 'store/skills';

import { PlayersHPEffects } from 'store/players-hp';

import { DemoMaterialModule } from './material-module';

import { LayoutModule } from '@angular/cdk/layout';
import { PipesModule } from './pipes/pipes.module';
import { InfobarComponent } from './components/infobar/infobar.component';
import { PlayersHPFacade } from 'store/players-hp/players-hp.facade';
import { CardEditorComponent } from './pages/card-editor/card-editor.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { SkillsService } from './services/skills.service';
import { NotSavedDialogComponent } from './components/not-saved-dialog/not-saved-dialog.component';

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
  { path: 'editor', component: CardEditorComponent },
  {
    path: '',
    redirectTo: '/battle',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  exports: [RouterModule, CardComponent],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    StoreModule.forRoot({}),
    StoreModule.forFeature('cardsState', reducers.cards, {
      initialState
    }),
    StoreModule.forFeature('skillsState', reducers.skills, {}),
    StoreModule.forFeature('playersHPState', reducers.playersHP, {}),
    EffectsModule.forRoot([CardsEffects, PlayersHPEffects, SkillsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    FontAwesomeModule,
    PipesModule,
  ],
  declarations: [
    AppComponent,
    CardComponent,
    DialogOverviewExampleDialogComponent,
    WelcomePageComponent,
    FightPageComponent,
    NotFoundPageComponent,
    InfobarComponent,
    CardEditorComponent,
    CardDetailComponent,
    NotSavedDialogComponent
  ],
  entryComponents: [
    NotSavedDialogComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    TimerService,
    SocketService,
    FightService,
    UserService,
    SkillsService,
    CardsFacade,
    SkillsFacade,
    PlayersHPFacade
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
