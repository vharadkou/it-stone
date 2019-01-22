import { Action } from '@ngrx/store';

export enum SocketActionTypes {
  ReadyForSocketConnection = '[socket Ready For Socket Connection]',
  SetSocketConnection = '[socket] Set Socket Connection'
}

export class ReadyForSocketConnection implements Action {
  public readonly type = SocketActionTypes.ReadyForSocketConnection;
}

export class SetSocketConnection implements Action {
  public readonly type = SocketActionTypes.SetSocketConnection;

  constructor(public payload: string) { }
}

export type SocketAction =
  | ReadyForSocketConnection
  | SetSocketConnection;
