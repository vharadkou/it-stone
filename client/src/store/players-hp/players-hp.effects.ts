import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import * as playersHPActions from './players-hp.action';
import { PlayersHPState } from './interfaces';

@Injectable()
export class PlayersHPEffects {
  public baseUrl = 'http://www.mocky.io/v2/5bf697823200008e005d0ff1';

  @Effect() public loadPlayersHP$: Observable<Action> = this.actions$.pipe(
    ofType<playersHPActions.GetPlayersHP>(playersHPActions.PlayersHPActionTypes.GetPlayersHP),
    switchMap((action: playersHPActions.GetPlayersHP) =>
      this.http.get(this.baseUrl).pipe(
        map((data: PlayersHPState) => new playersHPActions.GetPlayersHP(data))
      )
    )
  );

  public constructor(private http: HttpClient, private actions$: Actions) {}
}
