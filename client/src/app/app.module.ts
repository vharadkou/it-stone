import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, } from "@angular/http";
import { MatNativeDateModule } from "@angular/material";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import {
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialLoginModule
} from "angular-6-social-login";
import {
  CardComponent,
  DialogOverviewExampleDialogComponent
} from "components";
import {
  FightPageComponent,
  NotFoundPageComponent,
  AuthorizationComponent,
  WelcomePageComponent,
  AccountPageComponent
} from "pages";
import {
  FightService,
  // SocketService,
  TimerService,
  UserService
} from "services";
import { SpellService } from "./services/spell.service";
import { reducers, PlayersInfoFacade, GameProcessFacade } from "store";
import { HeroFacade, HeroEffects, HeroState } from "store/hero";
import { CardsEffects, CardsFacade, initialState } from "store/cards";
import { UserFacade, initialUserState, UserEffects } from "store/user";
import { PlayersHPEffects } from "store/players-hp";
import { AboutPageEffects, AboutPageFacade } from "store/about-page";
import { PlayersHPFacade } from "store/players-hp/players-hp.facade";
import { SkillsEffects, SkillsFacade, skillsInitialState } from "store/skills";
//import { SocketEffect, SocketFacade } from 'store/socket';
import { AppComponent } from "./app.component";
import { AboutCardComponent } from "./components/about-card/about-card.component";
import { BattleFieldComponent } from "./components/battle-field/battle-field.component";
import { CardDetailComponent } from "./components/card-detail/card-detail.component";
import { HiddenCardComponent } from "./components/hidden-card/hidden-card.component";
import { InfobarComponent } from "./components/infobar/infobar.component";
import { MaterialDialogCardChoosingComponent } from "./components/material-dialog-card-choosing/material-dialog-card-choosing.component";
import { MaterialDialogComponent } from "./components/material-dialog/material-dialog.component";
import { DemoMaterialModule } from "./material-module";
import { AboutPageComponent } from "./pages/about/about.component";
import { CardEditorComponent } from "./pages/card-editor/card-editor.component";
import { InnerPagesComponent } from "./pages/inner-pages/inner-pages.component";
import { LoginPageLayoutComponent } from "./pages/login-page-layout/login-page-layout.component";
import { PipesModule } from "./pipes/pipes.module";
import { SkillsService } from "./services/skills.service";
import { CardCarouselComponent } from "./components/card-carousel/card-carousel.component";
import { SignInComponent } from "./pages/authorization/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/authorization/sign-up/sign-up.component";
import { AuthorizationGuard } from "./authorization.guard";
import { ScreensaverComponent } from "./components/screensaver/screensaver.component";
import { PlayerInfoComponent } from "./components/player-info/player-info.component";
import { AccountComponent } from "./components/account/account.component";
import { RulesComponent } from "./pages/rules/rules.component";
import { from } from "rxjs";
import {TokenInterceptor} from './interceptors/http.interceptor'

export function getAuthServiceConfigs(): AuthServiceConfig {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        "109247559839-2osrqa6gnuqovro4kb25hal7mtt8pdj2.apps.googleusercontent.com"
      )
    }
  ]);

  return config;
}

const appRoutes: Routes = [
  {
    path: "battle",

    component: FightPageComponent,  canActivate: [AuthorizationGuard]
  },
  { path: "editor", component: CardEditorComponent },
  { path: "authorization", component: AuthorizationComponent },
  { path: "about", component: AboutPageComponent, canActivate: [AuthorizationGuard] },
  {
    path: "user/:id",
    component: AccountComponent, canActivate: [AuthorizationGuard],
    children: [{ path: "rules", component: RulesComponent }]
  },
  {
    path: "",
    redirectTo: "/authorization",
    pathMatch: "full"
  },
  { path: "**", component: AuthorizationComponent }
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
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    StoreModule.forRoot({}),
    StoreModule.forFeature("cardsState", reducers.cards, {
      initialState
    }),
    StoreModule.forFeature("userState", reducers.user, {}),
    StoreModule.forFeature("aboutPageState", reducers.aboutCards, {}),
    StoreModule.forFeature("gameProcessState", reducers.gameProcess, {}),
    StoreModule.forFeature("skillsState", reducers.skills, {}),
    StoreModule.forFeature("playersHPState", reducers.playersHP, {}),
    StoreModule.forFeature("heroState", reducers.hero, {}),
    //StoreModule.forFeature('socketState', reducers.socket, {}),
    StoreModule.forFeature("playersInfoState", reducers.playersInfo, {}),
    EffectsModule.forRoot([
      CardsEffects,
      PlayersHPEffects,
      /* SocketEffect,*/ SkillsEffects,
      AboutPageEffects,
      HeroEffects,
      UserEffects
    ]),

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
    BattleFieldComponent,
    CardComponent,
    HiddenCardComponent,
    DialogOverviewExampleDialogComponent,
    FightPageComponent,
    NotFoundPageComponent,
    InfobarComponent,
    CardEditorComponent,
    CardDetailComponent,
    MaterialDialogComponent,
    CardCarouselComponent,
    AuthorizationComponent,
    SignInComponent,
    SignUpComponent,
    InnerPagesComponent,
    LoginPageLayoutComponent,
    MaterialDialogCardChoosingComponent,
    ScreensaverComponent,
    PlayerInfoComponent,
    AccountComponent,
    AccountPageComponent,
    RulesComponent
  ],
  entryComponents: [
    MaterialDialogComponent,
    MaterialDialogCardChoosingComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    //  SocketService,
    CardsFacade,
    AboutPageFacade,
    GameProcessFacade,
    PlayersHPFacade,
    UserFacade,
    AuthorizationGuard,
    PlayersInfoFacade,
    // SocketFacade,
    HeroFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
