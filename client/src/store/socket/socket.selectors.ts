import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SocketState } from './interfaces';

const getSocketState = createFeatureSelector<SocketState>('socketState');

const GetConnectedRoom = (state: SocketState): string => state.connectedRoom;

const getSocketStatus = createSelector(
  getSocketState,
  GetConnectedRoom
);

export const socketQuery = {
  getSocketStatus
};
