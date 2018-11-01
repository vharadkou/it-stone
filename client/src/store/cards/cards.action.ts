import { Action } from '@ngrx/store';
import { Card } from 'models';

export enum CardsActionTypes {
  GetCards = '[cards] Get Cards',
  GetCardsSuccess = '[cards] GetCards (Success)',
  GetCardsError = '[cards] GetCards (Error)',
  MoveCardsFromDeckToMe = '[cards] Move cards to me from deck',
  MoveCardsFromDeckToEnemy = '[cards] Move cards to enemy from deck',
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

export class MoveCardsFromDeckToMe implements Action {
  public readonly type = CardsActionTypes.MoveCardsFromDeckToMe;

  constructor(public payload: { amount: number }) {}
}

export class MoveCardsFromDeckToEnemy implements Action {
  public readonly type = CardsActionTypes.MoveCardsFromDeckToEnemy;

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
  | MoveCardsFromDeckToMe
  | MoveCardsFromDeckToEnemy
  | MoveMyCardToBattle
  | MoveEnemyCardToBattle
  | DeleteMyCardFromBattle
  | DeleteEnemyCardFromBattle;
