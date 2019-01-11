import { Action } from '@ngrx/store';

export enum SocketActionTypes {
  SetSocketConnected = '[socket] Set Socket Connected'
}

export class SetSocketConnected implements Action {
  public readonly type = SocketActionTypes.SetSocketConnected;

  constructor(public payload: boolean) { }
}
