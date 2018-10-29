import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import * as cardActions from './cards.action';
import { Card } from 'models';

@Injectable()
export class CardsEffects {

  @Effect() public getCards$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.GetCards>(cardActions.CardsActionTypes.GetCards),
    switchMap((action: cardActions.GetCards) =>
      this.http.get('http://www.mocky.io/v2/5bd6f6183500000523fd7e40').pipe(
        map((data: Card[]) => new cardActions.GetCardsSuccess(data)),
        catchError((error) => of(new cardActions.GetCardsError(error)))
      )
    )
  );

  public constructor(
    private http: HttpClient,
    private actions$: Actions,
  ) { }
}
