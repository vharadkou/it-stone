
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '../../models';

import { UserState } from './interfaces';

const getUserState = createFeatureSelector<UserState>('userState');

const GetUser = (state: UserState) => state.user;

const getUser = createSelector(
  getUserState,
  GetUser
);

export const userQuery = {
  getUser,
  getUserState
};
