import { SocketStatus } from 'models';

export interface SocketState {
  socketStatus: SocketStatus;
  socketConnected: boolean;
}
