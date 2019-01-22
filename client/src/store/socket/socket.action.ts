import { Action } from '@ngrx/store';

export enum SocketActionTypes {
  JoinRoom = '[socket] Join Room',
  JoinRoomSuccess = '[socket] Join Room Success'
}

export class JoinRoom implements Action {
  public readonly type = SocketActionTypes.JoinRoom;
}

export class JoinRoomSuccess implements Action {
  public readonly type = SocketActionTypes.JoinRoomSuccess;

  constructor(public payload: string) { }
}

export type SocketAction =
  | JoinRoom
  | JoinRoomSuccess;
