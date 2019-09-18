import { Status } from 'models';

import { UserActionTypes, UserAction } from './user.action';
import { initialUserState } from './user.initial';
import { UserState } from './interfaces';

export const userReducer = (
  state: UserState = initialUserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.UserSignIn:
      return {
        ...state,
        status: Status.Init
      };

    case UserActionTypes.UserSignInSuccess:
      return {
        ...state,
        user: { ...action.payload }
      };

    case UserActionTypes.UserSignInError:
      return {
        ...state,
        user: { ...action.payload }
      };

    case UserActionTypes.UserSignUp:
      return {
        ...state,
      };

    case UserActionTypes.UserSignUpSuccess:
      return {
        ...state,
        user: { ...action.payload }
      }

    default:
      return state;
  }
};
