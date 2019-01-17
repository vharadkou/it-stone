import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SocketState } from './interfaces';
import { socketQuery } from './socket.selectors';

import {
  FailedSocketConnection,
  ReadyForSocketConnection,
  SetSocketConnection
} from './socket.action';

@Injectable()
export class SocketFacade {
  public socketStatus$ = this.store.select(socketQuery.getSocketStatus);

  public constructor(private store: Store<SocketState>) { }

  public readyForSocketConnection(): void {
    this.store.dispatch(new ReadyForSocketConnection());
  }

  public setSocketConnection(connected: boolean): void {
    this.store.dispatch(new SetSocketConnection(connected));
  }
}
