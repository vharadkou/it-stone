
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '../../models';

import { UserState } from './interfaces';

const getUserState = createFeatureSelector<UserState>('userState');

const GetUser = (state: UserState) => state.user;
const GetErrorText = (state: UserState) => state.errorText;

const getUser = createSelector(
  getUserState,
  GetUser
);

const getError = createSelector(
  getUserState,
  GetErrorText
);

export const userQuery = {
  getUser,
  getUserState,
  getError
};
