import { baseUrl } from "constants/baseUrl";
import {UserHttpData} from './interfaces'
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { PopupsService } from "app/services/popups.service";
import { User } from "models";
import { Observable, of } from "rxjs";
import { catchError, filter, map, switchMap, take } from "rxjs/operators";
import { TokenService } from "../../app/services/token.service";

import * as userActions from "./user.action";


@Injectable({
  providedIn: "root"
})
export class UserEffects {
  public resultAction: Action;



  @Effect() public registerUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserSignUp>(userActions.UserActionTypes.UserSignUp),
    switchMap((action: userActions.UserSignUp) => {
      return this.http.post("/api/v0/registration", action.payload).pipe(
        map((data: {token:string}) => {
          this._tokenService.setToken(data.token);
          return new userActions.UserSignUpSuccess();
        }),
        catchError(errorData => of(new userActions.UserSignUpError(errorData)))
      );
    })
  );

  @Effect() public loginUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserSignIn>(userActions.UserActionTypes.UserSignIn),
    switchMap((action: userActions.UserSignIn) => {
      return this.http.post("/api/v0/login", action.payload).pipe(
        map((data: {token:string}, i) => {
          this._tokenService.setToken(data.token);
          return new userActions.UserSignInSuccess();
        }),
        catchError(errorData => of(new userActions.UserSignInError(errorData)))
      );
    })
  );

  @Effect() public getUserInfoWithSignUp$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserSignUpSuccess>(
      userActions.UserActionTypes.UserSignUpSuccess
    ),
    switchMap((action: userActions.UserSignUpSuccess) => {
      return this.http.get("/api/v0/user").pipe(
        map((data: UserHttpData) => {
          return new userActions.UserSetData({
            id: data.id,
            userName: data.userName,
            email: data.email,
            winGames: data.winGames,
            totalGames: data.totalGames
          });
        }),
        catchError(errorData => of(new userActions.UserSetDataError(errorData)))
      );
    })
  );

  @Effect() public getUserInfoWithSignIn$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserSignInSuccess>(
      userActions.UserActionTypes.UserSignInSuccess
    ),
    switchMap((action: userActions.UserSignInSuccess) => {
      return this.http.get("/api/v0/user").pipe(
        map((data: UserHttpData) => {
          return new userActions.UserSetData({
            id: data.id,
            userName: data.userName,
            email: data.email,
            winGames: data.winGames,
            totalGames: data.totalGames
          });
        }),
        catchError(errorData => of(new userActions.UserSetDataError(errorData)))
      );
    })
  );

  public constructor(
    private actions$: Actions,
    private http: HttpClient,
    private _tokenService: TokenService
  ) {}
}
