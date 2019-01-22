import { Action } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { SocketService } from 'app/services';

import * as socketActions from './socket.action';

@Injectable()
export class SocketEffect {
  public room: string = 'battle';

  @Effect() public setSocketConnection$: Observable<Action> = this.actions$.pipe(
    ofType<socketActions.ReadyForSocketConnection>(socketActions.SocketActionTypes.ReadyForSocketConnection),
    switchMap((action: socketActions.ReadyForSocketConnection) =>
      this.socketService.join(this.room).pipe(
        map((room: string) => new socketActions.SetSocketConnection(room))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private socketService: SocketService
  ) { }
}
