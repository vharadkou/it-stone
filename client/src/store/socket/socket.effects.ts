import { Action } from '@ngrx/store';

import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SocketService } from 'app/services';

import * as socketActions from './socket.action';

@Injectable()
export class SocketEffect {
  // private socket: SocketIOClient.Socket;

  @Effect() public setSocketConnection$: Observable<Action> = this.actions$.pipe(
    ofType<socketActions.ReadyForSocketConnection>(socketActions.SocketActionTypes.ReadyForSocketConnection),
    switchMap((action: socketActions.ReadyForSocketConnection) =>
      this.socketService.connected$
        .pipe(
          map(connected => new socketActions.SetSocketConnection(connected)),
          catchError(error => of(new socketActions.FailedSocketConnection(error))
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private socketService: SocketService
  ) { }
}
