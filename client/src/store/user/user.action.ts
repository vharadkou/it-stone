import { Action } from '@ngrx/store';
import { User } from 'models';

export enum UserActionTypes {
  UserSignIn = '[user] User SignIn',
  UserSignUp = '[user] User SignUp',
  UserSignInSuccess = '[user] User SignIn Success',
  UserSignUpSuccess = '[user] User SignUp Success',
  UserSignInError = '[user] User SignIn Error',
}

export class UserSignIn implements Action {
  public readonly type = UserActionTypes.UserSignIn;
  
  constructor(public payload: User){}
}

export class UserSignInSuccess implements Action {
  public readonly type = UserActionTypes.UserSignInSuccess;

  constructor(public payload: User) { }
}

export class UserSignUp implements Action {
  public readonly type = UserActionTypes.UserSignUp;

}

export class UserSignUpSuccess implements Action {
  public readonly type = UserActionTypes.UserSignUpSuccess;

  constructor(public payload: User) { }
}

export class UserSignInError implements Action {
  public readonly type = UserActionTypes.UserSignInError;

  constructor(public payload: User) {
   }
}

export type UserAction =
  | UserSignIn
  | UserSignInSuccess
  | UserSignUp
  | UserSignUpSuccess
  | UserSignInError;
