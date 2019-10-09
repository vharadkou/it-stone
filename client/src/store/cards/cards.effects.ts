import { baseUrl } from "constants/baseUrl";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { PopupsService } from "app/services/popups.service";
import { Card } from "models";
import { Observable, of } from "rxjs";
import {
  catchError,
  filter,
  map,
  switchMap,
  take,
  delay
} from "rxjs/operators";
import { CardsFacade } from "store/cards/cards.facade";
import { GameStatus } from "../../models";
import * as skillsActions from "../skills/skills.action";
import { TokenService } from "../../app/services/token.service";
import * as cardActions from "./cards.action";
import * as gameProcessActions from "../game-process/game-process.action";

@Injectable()
export class CardsEffects {
  public resultAction: Action;

  public myFirstMoveVariants = [true, false];

  @Effect() public getCards$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.LoadCards>(cardActions.CardsActionTypes.LoadCards),
    switchMap((action: cardActions.LoadCards) => {
      return this.http.get("/api/v0/cards").pipe(
        switchMap((data: Card[]) => [
          new gameProcessActions.StartGameSuccess({
            status: GameStatus.Start,
            myFirstMove: this.shuffle(this.myFirstMoveVariants)
          }), //just a temporary mock
          new cardActions.LoadCardsSuccess(this.shuffle(data))
        ]),
        catchError(error => of(new cardActions.LoadCardsError(error)))
      );
    })
  );

  @Effect() public deleteCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.DeleteCard>(cardActions.CardsActionTypes.DeleteCard),
    switchMap((action: cardActions.DeleteCard) => {
      return this.http
        .request("delete", `/api/v0/cards/`, {
          body: action.payload
        })
        .pipe(
          map(() => new cardActions.DeleteCardSuccess(action.payload)),
          catchError(error => of(new cardActions.DeleteCardError(error)))
        );
    })
  );

  @Effect() public ShowDeleteCardPopup$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<cardActions.ShowDeleteCardPopup>(
      cardActions.CardsActionTypes.ShowDeleteCardPopup
    ),
    switchMap((action: cardActions.ShowDeleteCardPopup) => {
      return this.popupsService
        .openDialog(action.payload.textContent)
        .pipe(filter(result => result))
        .pipe(map(() => new cardActions.DeleteCard(action.payload)));
    })
  );

  @Effect() public updateCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.UpdateCard>(cardActions.CardsActionTypes.UpdateCard),
    switchMap((action: cardActions.UpdateCard) => {
      return this.http
        .put(`${baseUrl}/api/update-card/`, action.payload.card)
        .pipe(
          map(() => new cardActions.UpdateCardSuccess()),
          catchError(error => of(new cardActions.UpdateCardError(error)))
        );
    })
  );

  @Effect() public ShowNewCardPopup$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.ShowNewCardPopup>(
      cardActions.CardsActionTypes.ShowNewCardPopup
    ),
    switchMap((action: cardActions.ShowNewCardPopup) => {
      return this.popupsService
        .openDialog(action.payload.textContent)
        .pipe(filter(result => result))
        .pipe(map(() => new cardActions.ChangeSelectedCardId(action.payload)));
    })
  );

 /* @Effect() public changeSelectedCardId$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<cardActions.ChangeSelectedCardId>(
      cardActions.CardsActionTypes.ChangeSelectedCardId
    ),
    map(action => {
      if (action.payload.id !== 100) {
        return new skillsActions.CheckSkills(action.payload);
      } else {
        return new skillsActions.CheckSkills({});
      }
    })
  );

  @Effect() public checkNewCardDataLoss$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<cardActions.CheckNewCardDataLoss>(
      cardActions.CardsActionTypes.CheckNewCardDataLoss
    ),
    map(action => {
      if (action.payload.form.dirty && action.payload.card) {
        this.cardsFacade.selectedCardId$
          .pipe(take(1))
          .subscribe((result: number) => {
            if (result === 100) {
              this.resultAction = new cardActions.ShowNewCardPopup(
                action.payload
              );
            } else {
              this.resultAction = new cardActions.ChangeSelectedCardId(
                action.payload
              );
            }
          });
        return this.resultAction;
      } else {
        return new cardActions.ChangeSelectedCardId(action.payload);
      }
    })
  );*/

  public constructor(
    private http: HttpClient,
    private actions$: Actions,
    private popupsService: PopupsService,
    private cardsFacade: CardsFacade,
    private _tokenService: TokenService
  ) {}

  public shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    if (array.length === 2) {
      return array[0];
    } else {
      return array;
    }
  }
}
