import { SocketStatus } from 'models';

import {SocketState} from './interfaces';

export const socketInitial: SocketState = {
  socketStatus: SocketStatus.Disconnected,
  connectedRoom: ''
};
