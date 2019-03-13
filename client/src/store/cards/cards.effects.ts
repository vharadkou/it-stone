import { baseUrl } from 'constants/baseUrl';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { PopupsService } from 'app/services/popups.service';
import { Card } from 'models';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { CardsFacade } from 'store/cards/cards.facade';

import * as skillsActions from '../skills/skills.action';

import * as cardActions from './cards.action';

@Injectable()
export class CardsEffects {
  public resultAction: Action;

  @Effect() public getCards$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.LoadCards>(cardActions.CardsActionTypes.LoadCards),
    switchMap((action: cardActions.LoadCards) =>
      this.http.get(`${baseUrl}/api/get-cards/`).pipe(
        map((data: Card[]) => new cardActions.LoadCardsSuccess(data)),
        catchError(error => of(new cardActions.LoadCardsError(error)))
      )
    )
  );

  @Effect() public deleteCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.DeleteCard>(cardActions.CardsActionTypes.DeleteCard),
    switchMap((action: cardActions.DeleteCard) => {
      return this.http.request('delete', `${baseUrl}/api/delete-card/`, {
        body: action.payload
      }).pipe(
          map(() => new cardActions.DeleteCardSuccess(action.payload)),
          catchError(error => of(new cardActions.DeleteCardError(error)))
        );
    })
  );

  @Effect() public ShowDeleteCardPopup$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.ShowDeleteCardPopup>(cardActions.CardsActionTypes.ShowDeleteCardPopup),
    switchMap((action: cardActions.ShowDeleteCardPopup) => {
      return this.popupsService
        .openDialog(action.payload.textContent).pipe(
          filter(result => result)
        ).pipe(map(() => new cardActions.DeleteCard(action.payload),
        ));
    })
  );

  @Effect() public uploadCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.UploadCard>(cardActions.CardsActionTypes.UploadCard),
    switchMap((action: cardActions.UploadCard) => {
      return this.http.post(`${baseUrl}/api/save-card/`, action.payload.card).pipe(
        map(() => new cardActions.UploadCardSuccess(action.payload)),
        catchError(error => of(new cardActions.UploadCardError(error)))
      );
    })
  );

  @Effect() public updateCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.UpdateCard>(cardActions.CardsActionTypes.UpdateCard),
    switchMap((action: cardActions.UpdateCard) => {
      return this.http.put(`${baseUrl}/api/update-card/`, action.payload.card).pipe(
        map(() => new cardActions.UpdateCardSuccess()),
        catchError(error => of(new cardActions.UpdateCardError(error)))
      );
    })
  );

  @Effect() public ShowNewCardPopup$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.ShowNewCardPopup>(cardActions.CardsActionTypes.ShowNewCardPopup),
    switchMap((action: cardActions.ShowNewCardPopup) => {
      return this.popupsService
        .openDialog(action.payload.textContent).pipe(
          filter(result => result)
        ).pipe(map(() => new cardActions.ChangeSelectedCardId(action.payload)
        ));
    })
  );

  @Effect() public changeSelectedCardId$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.ChangeSelectedCardId>(cardActions.CardsActionTypes.ChangeSelectedCardId),
    map(action => {
      if (action.payload.id !== 100) {
        return new skillsActions.CheckSkills(action.payload);
      } else {
        return new skillsActions.CheckSkills({});
      }
    })
  );

  @Effect() public checkNewCardDataLoss$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.CheckNewCardDataLoss>(cardActions.CardsActionTypes.CheckNewCardDataLoss),
    map(action => {
      if (action.payload.form.dirty && action.payload.card) {
        this.cardsFacade.selectedCardId$.pipe(take(1)).subscribe((result: number) => {
          if (result === 100) {
            this.resultAction = new cardActions.ShowNewCardPopup(action.payload);
          } else {
            this.resultAction = new cardActions.ChangeSelectedCardId(action.payload);
          }
        });
        return this.resultAction;
      } else {
        return new cardActions.ChangeSelectedCardId(action.payload);
      }
    })
  );

  public constructor(
    private http: HttpClient,
    private actions$: Actions,
    private popupsService: PopupsService,
    private cardsFacade: CardsFacade
  ) { }
}
