import { SocketStatus } from 'models';

import { SocketState } from './interfaces';
import { SocketAction, SocketActionTypes } from './socket.action';
import { socketInitial } from './socket.initial';

export const socketReducer = (
  state: SocketState = socketInitial,
  action: SocketAction
): SocketState => {
  switch (action.type) {
    case SocketActionTypes.ReadyForSocketConnection:
      return {
        ...state,
        socketStatus: SocketStatus.Disconnected
      };
    case SocketActionTypes.SetSocketConnection:
      return {
        ...state,
        socketStatus: SocketStatus.Connected,
        socketConnected: action.payload
      };
    case SocketActionTypes.FailedSocketConnection:
      return {
        ...state,
        socketStatus: SocketStatus.Error
      };
    default:
      return state;
  }
};
