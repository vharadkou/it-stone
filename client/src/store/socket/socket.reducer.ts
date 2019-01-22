import { SocketStatus } from 'models';

import { SocketState } from './interfaces';
import { SocketAction, SocketActionTypes } from './socket.action';
import { socketInitial } from './socket.initial';

export const socketReducer = (
  state: SocketState = socketInitial,
  action: SocketAction
): SocketState => {
  switch (action.type) {
    case SocketActionTypes.JoinRoom:
      return {
        ...state,
        socketStatus: SocketStatus.Disconnected
      };
    case SocketActionTypes.JoinRoomSuccess:
      return {
        ...state,
        socketStatus: SocketStatus.Connected,
        connectedRoom: action.payload
      };
    default:
      return state;
  }
};
