import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SocketState } from './interfaces';
import { socketQuery } from './socket.selectors';

import {
  JoinRoom,
  JoinRoomSuccess
} from './socket.action';

@Injectable()
export class SocketFacade {
  public socketStatus$ = this.store.select(socketQuery.getSocketStatus);

  public constructor(private store: Store<SocketState>) { }

  public joinRoom(): void {
    this.store.dispatch(new JoinRoom());
  }

  public joinRoomSuccess(room: string): void {
    this.store.dispatch(new JoinRoomSuccess(room));
  }
}
