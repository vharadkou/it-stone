import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { PopupsService } from 'app/services/popups.service';
import { Card } from 'models';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import * as cardActions from './cards.action';

@Injectable()
export class CardsEffects {
  public baseUrl = 'http://www.mocky.io/v2/5c232f8b2f00009100049446';
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

  @Effect() public showPopup$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.ShowPopup>(cardActions.CardsActionTypes.ShowPopup),
    switchMap((action: cardActions.ShowPopup) => {
      return this.popupsService
        .openDialog(action.payload.title, action.payload.text).pipe(
          filter(result => result)
        ).pipe(map(() => new cardActions.DeleteCard(action.payload)
        ));
    })
  );

  public constructor(
    private http: HttpClient,
    private actions$: Actions,
    private popupsService: PopupsService
  ) { }
}
