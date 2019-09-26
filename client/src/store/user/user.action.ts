import { Action } from "@ngrx/store";
import { User } from "models";

export enum UserActionTypes {
  UserSignIn = "[user] User SignIn",
  UserSignUp = "[user] User SignUp",
  UserSignInSuccess = "[user] User SignIn Success",
  UserSignUpSuccess = "[user] User SignUp Success",
  UserSignInError = "[user] User SignIn Error",
  UserSignUpError = "[user] User SignUp Error",
  UserLogOut = "[user] Log out",
  UserSetData = "[user] Set Data From Localstorage",
  UserSetDataError = "[user] User Set Data Error",
}

export class UserSignIn implements Action {
  public readonly type = UserActionTypes.UserSignIn;

  constructor(public payload: { userName: string; password: string }) {}
}

export class UserSignInSuccess implements Action {
  public readonly type = UserActionTypes.UserSignInSuccess;
}

export class UserSignUp implements Action {
  public readonly type = UserActionTypes.UserSignUp;
  constructor(public payload: {userName: string, email: string; password: string }) {}
}

export class UserSignUpSuccess implements Action {
  public readonly type = UserActionTypes.UserSignUpSuccess;

}

export class UserSignInError implements Action {
  public readonly type = UserActionTypes.UserSignInError;

  constructor(public payload: any) {}
}
export class UserSignUpError implements Action {
  public readonly type = UserActionTypes.UserSignUpError;

  constructor(public payload: any) {}
}
export class UserLogOut implements Action {
  public readonly type = UserActionTypes.UserLogOut;
}

export class UserSetData implements Action {
  public readonly type = UserActionTypes.UserSetData;
  constructor(public payload: User) {}
}

export class UserSetDataError implements Action {
  public readonly type = UserActionTypes.UserSetDataError;
  constructor(public payload: any) {}
}

export type UserAction =
  | UserSignIn
  | UserSignInSuccess
  | UserSignUp
  | UserSignUpSuccess
  | UserSignInError
  | UserSignUpError
  |UserSetData
  |UserSetDataError
  |UserLogOut;
