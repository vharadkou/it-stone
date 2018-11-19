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
  public baseUrl = 'http://www.mocky.io/v2/5beacbc22f00004723da3c9a';
  public secondUrl = 'http://www.mocky.io/v2/5be983f82e00005f00f14631';

  @Effect() public getCards$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.LoadCards>(cardActions.CardsActionTypes.LoadCards),
    switchMap((action: cardActions.LoadCards) =>
      this.http.get(this.baseUrl).pipe(
        map((data: Card[]) => new cardActions.LoadCardsSuccess(data)),
        catchError(error => of(new cardActions.LoadCardsError(error)))
      )
    )
  );

  public constructor(private http: HttpClient, private actions$: Actions) {}
}
