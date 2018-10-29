import { Action } from '@ngrx/store';
import { Card } from 'models';

export enum CardsActionTypes {
  GetCards = '[cards] Get Cards',
  GetCardsSuccess = '[cards] GetCards (Success)',
  GetCardsError = '[cards] GetCards (Error)'
}

export class GetCards implements Action {
  public readonly type = CardsActionTypes.GetCards;
}

export class GetCardsSuccess implements Action {
  public readonly type = CardsActionTypes.GetCardsSuccess;

  constructor(public payload: Card[]) { }
}

export class GetCardsError implements Action {
  public readonly type = CardsActionTypes.GetCardsError;

  constructor(public payload: Error) { }
}

export type CardsActions =
  | GetCards
  | GetCardsSuccess
  | GetCardsError;
