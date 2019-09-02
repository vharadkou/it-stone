import { baseUrl } from 'constants/baseUrl';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { PopupsService } from 'app/services/popups.service';
import { User } from 'models';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';

import * as skillsActions from '../skills/skills.action';

import * as userActions from './user.action';
import { UserFacade } from './user.facade';

const users: User[] = [
  {
    email: "SilDog.S@yandex.ru",
    nickName: "sss",
    password: '123'
  },
  {
    email: "aaa@aaa.ru",
    nickName: "aaa",
    password: '123'
  }
]

@Injectable()
export class UserEffects {
  public resultAction: Action;

  @Effect() public getUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UserSignIn>(userActions.UserActionTypes.UserSignIn),
    switchMap((action: userActions.UserSignIn) => {
      const localStorageUser = JSON.parse(localStorage.getItem('user'));
      return of(users).pipe(
        map((data: User[], i) => {
          if (data[i].email === action.payload.email && data[i].password === action.payload.password) {
            localStorage.setItem('user', JSON.stringify(data[i]));
            return new userActions.UserSignInSuccess(data[i]);
          } else if (data[i].email === localStorageUser.email && data[i].password === localStorageUser.password){
            return new userActions.UserSignInSuccess(data[i]);
          } else{
            throw new Error;
          }
        }),
        catchError(() => of(new userActions.UserSignInError({nickName: 'null', email: 'null', password: 'null'})))
      )
    }), catchError(() => of(new userActions.UserSignInError({nickName: 'null', email: 'null', password: 'null'})))
  );

  public constructor(
    private actions$: Actions
  ) { }
}
