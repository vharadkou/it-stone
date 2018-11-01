import { Action } from '@ngrx/store';
import { Card } from 'models';

export enum CardsActionTypes {
  GetCards = '[cards] Get Cards',
  GetCardsSuccess = '[cards] GetCards (Success)',
  GetCardsError = '[cards] GetCards (Error)',
  GetCardsFromDeckToMe = '[cards] Move cards to me from deck',
  GetCardsFromDeckToEnemy = '[cards] Move cards to enemy from deck',
  MoveMyCardToBattle = '[cards] Move my card to battle',
  MoveEnemyCardToBattle = '[cards] Move enemy card to battle',
  DeleteMyCardFromBattle = '[cards] Delete my card from battle field',
  DeleteEnemyCardFromBattle = '[cards] Delete enemy card from battle field'
}

export class GetCards implements Action {
  public readonly type = CardsActionTypes.GetCards;
}

export class GetCardsSuccess implements Action {
  public readonly type = CardsActionTypes.GetCardsSuccess;

  constructor(public payload: Card[]) {}
}

export class GetCardsError implements Action {
  public readonly type = CardsActionTypes.GetCardsError;

  constructor(public payload: Error) {}
}

export class GetCardsFromDeckToMe implements Action {
  public readonly type = CardsActionTypes.GetCardsFromDeckToMe;

  constructor(public payload: { amount: number }) {}
}

export class GetCardsFromDeckToEnemy implements Action {
  public readonly type = CardsActionTypes.GetCardsFromDeckToEnemy;

  constructor(public payload: { amount: number }) {}
}

export class MoveMyCardToBattle implements Action {
  public readonly type = CardsActionTypes.MoveMyCardToBattle;

  constructor(public payload: { id: number }) {}
}

export class MoveEnemyCardToBattle implements Action {
  public readonly type = CardsActionTypes.MoveEnemyCardToBattle;

  constructor(public payload: { id: number }) {}
}

export class DeleteMyCardFromBattle implements Action {
  public readonly type = CardsActionTypes.DeleteMyCardFromBattle;

  constructor(public payload: { id: number }) {}
}

export class DeleteEnemyCardFromBattle implements Action {
  public readonly type = CardsActionTypes.DeleteEnemyCardFromBattle;

  constructor(public payload: { id: number }) {}
}

export type CardsActions =
  | GetCards
  | GetCardsSuccess
  | GetCardsError
  | GetCardsFromDeckToMe
  | GetCardsFromDeckToEnemy
  | MoveMyCardToBattle
  | MoveEnemyCardToBattle
  | DeleteMyCardFromBattle
  | DeleteEnemyCardFromBattle;
