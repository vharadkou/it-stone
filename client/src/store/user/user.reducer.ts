import { Status } from "models";

import { UserActionTypes, UserAction } from "./user.action";
import { initialUserState } from "./user.initial";
import { UserState } from "./interfaces";

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
        status: Status.Success
      };

    case UserActionTypes.UserSignInError:
      return {
        ...state,
        status: Status.Error,
        errorText: action.payload.error.message
      };

    case UserActionTypes.UserSignUp:
      return {
        ...state,
        status: Status.Init
      };

    case UserActionTypes.UserSignUpSuccess:
      return {
        ...state,
        status: Status.Success
       
      };
    case UserActionTypes.UserSignUpError:
      return {
        ...state,
        status: Status.Error,
        errorText: action.payload.error.message
      };
    case UserActionTypes.UserLogOut:
      return {
        ...state,
        status: initialUserState.status,
        user: initialUserState.user
      };

      case UserActionTypes.UserSetData:
      return {
        ...state,
        status: Status.Success,
        user: { ...action.payload }
      };

    default:
      return state;
  }
};
