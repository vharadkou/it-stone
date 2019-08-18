import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatIconModule, MatMenuModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialLoginModule,
} from 'angular-6-social-login';
import {
  CardComponent,
  DialogOverviewExampleDialogComponent,
} from 'components';
import {
  FightPageComponent,
  NotFoundPageComponent,
  WelcomePageComponent,
  AccountPageComponent,
} from 'pages';
import {
  FightService,
  SocketService,
  TimerService,
  UserService,
} from 'services';
import { reducers, PlayersInfoFacade } from 'store';
import { HeroFacade, HeroEffects, HeroState } from 'store/hero';

import {
  CardsEffects,
  CardsFacade,
  initialState,
} from 'store/cards';
import { PlayersHPEffects } from 'store/players-hp';
import { AboutPageEffects, AboutPageFacade } from 'store/about-page';
import { PlayersHPFacade } from 'store/players-hp/players-hp.facade';
import {
  SkillsEffects,
  SkillsFacade,
  skillsInitialState
} from 'store/skills';
import { SocketEffect, SocketFacade } from 'store/socket';
import { AppComponent } from './app.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { InfobarComponent } from './components/infobar/infobar.component';
import { MaterialDialogComponent } from './components/material-dialog/material-dialog.component';
import { AboutPageComponent } from './pages/about/about.component';
import { AboutCardComponent } from './components/about-card/about-card.component';
import { DemoMaterialModule } from './material-module';
import { CardEditorComponent } from './pages/card-editor/card-editor.component';
import { PipesModule } from './pipes/pipes.module';
import { SkillsService } from './services/skills.service';
import { CardCarouselComponent } from './components/card-carousel/card-carousel.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { AccountComponent } from './components/account/account.component';
import { RulesComponent } from './pages/rules/rules.component';
import { from } from 'rxjs';
export function getAuthServiceConfigs(): AuthServiceConfig {
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
  { path: 'about', component: AboutPageComponent },
  { path: 'player', component: PlayerInfoComponent },
  {
    path: 'user/:id', component: AccountComponent,
    children: [
      { path: 'rules', component: RulesComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/battle',
    pathMatch: 'full'
  },
  { path: '**', component: FightPageComponent },

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
      { enableTracing: false }
    ),
    StoreModule.forRoot({}),
    StoreModule.forFeature('cardsState', reducers.cards, {
      initialState
    }),
    StoreModule.forFeature('aboutPageState', reducers.aboutCards, {}),
    StoreModule.forFeature('skillsState', reducers.skills, {}),
    StoreModule.forFeature('heroState', reducers.hero, {}),
    StoreModule.forFeature('socketState', reducers.socket, {}),
    StoreModule.forFeature('playersInfoState', reducers.playersInfo, {}),
    StoreModule.forFeature('heroState', reducers.hero, {}),
    EffectsModule.forRoot([CardsEffects, PlayersHPEffects, SocketEffect, SkillsEffects, AboutPageEffects, HeroEffects]),
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
    PipesModule
  ],
  declarations: [
    AppComponent,
    AboutPageComponent,
    AboutCardComponent,
    CardComponent,
    DialogOverviewExampleDialogComponent,
    WelcomePageComponent,
    FightPageComponent,
    NotFoundPageComponent,
    InfobarComponent,
    CardEditorComponent,
    CardDetailComponent,
    MaterialDialogComponent,
    CardCarouselComponent,
    PlayerInfoComponent,
    AccountComponent,
    AccountPageComponent,
    RulesComponent,
  ],
  entryComponents: [
    MaterialDialogComponent
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
    AboutPageFacade,
    PlayersInfoFacade,
    PlayersHPFacade,
    SocketFacade,
    HeroFacade,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
