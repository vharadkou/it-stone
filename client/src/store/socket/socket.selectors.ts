import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SocketState } from './interfaces';

const getSocketState = createFeatureSelector<SocketState>('socketState');

const GetSocketStatus = (state: SocketState): boolean => state.socketConnected;

const getSocketStatus = createSelector(
  getSocketState,
  GetSocketStatus
);

export const socketQuery = {
  getSocketStatus
};
