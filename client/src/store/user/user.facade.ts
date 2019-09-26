import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User, PopupTextContent } from 'models';

import {
  UserSignIn,
  UserSignInSuccess,
  UserSignUp,
  UserSignUpSuccess,
  UserSignUpError,
  UserSignInError,
  UserLogOut,
  UserSetData
} from './user.action';
import { userQuery } from './user.selectors';
import { UserState } from './interfaces';

@Injectable()
export class UserFacade {
  public user$ = this.store.select(userQuery.getUser);
  public userError$ = this.store.select(userQuery.getError);

  public constructor(private store: Store<UserState>) { }

  public UserSignIn(user): void {
    this.store.dispatch(new UserSignIn(user));
  }

  public UserSignInSuccess(): void {
    this.store.dispatch(new UserSignInSuccess());
  }

  public UserSignUp(data): void {
    this.store.dispatch(new UserSignUp(data));
  }

  public UserSignUpSuccess(): void {
    this.store.dispatch(new UserSignUpSuccess());
  }
  public UserSignUpError(user): void {
    this.store.dispatch(new UserSignUpError(user));
  }
  public UserSignInError(user): void {
    this.store.dispatch(new UserSignInError(user));
  }

  public UserLogOut(): void {
    this.store.dispatch(new UserLogOut());
  }

  public UserSetData(user): void {
    this.store.dispatch(new UserSetData(user));
  }
}
