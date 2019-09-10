import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { PlayersHPState } from './interfaces';
import * as playersHPActions from './players-hp.action';

@Injectable()
export class PlayersHPEffects {
  public baseUrl = 'http://www.mocky.io/v2/5bf697823200008e005d0ff1';

  @Effect() public loadPlayersHP$: Observable<Action> = this.actions$.pipe(
    ofType<playersHPActions.LoadPlayersHP>(playersHPActions.PlayersHPActionTypes.LoadPlayersHP),
    switchMap((action: playersHPActions.LoadPlayersHP) =>
      this.http.get(this.baseUrl).pipe(
        map((data: PlayersHPState) => new playersHPActions.LoadPlayersHP(data))
      )
    )
  );

  public constructor(private http: HttpClient, private actions$: Actions) {}
}
