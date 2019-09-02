import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User, PopupTextContent } from 'models';

import {
  UserSignIn,
  UserSignInSuccess,
  UserSignUp,
  UserSignUpSuccess
} from './user.action';
import { userQuery } from './user.selectors';
import { UserState } from './interfaces';

@Injectable()
export class UserFacade {
  public user$ = this.store.select(userQuery.getUser);

  public constructor(private store: Store<UserState>) { }

  public UserSignIn(user): void {
    this.store.dispatch(new UserSignIn(user));
  }

  public UserSignInSuccess(user): void {
    this.store.dispatch(new UserSignInSuccess(user));
  }

  public UserSignUpSuccess(user): void {
    this.store.dispatch(new UserSignUpSuccess(user));
  }
}
