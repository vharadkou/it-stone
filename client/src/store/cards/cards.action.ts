import { Action } from '@ngrx/store';
import { Card } from 'models';

export enum CardsActionTypes {
  GetCards = '[cards] Get Cards',
  GetCardsSuccess = '[cards] GetCards (Success)',
  GetCardsError = '[cards] GetCards (Error)',
  GetMyNewCards = '[cards] Move cards to me from deck',
  GetEnemyNewCards = '[cards] Move cards to enemy from deck',
  GetMyBattleCard = '[cards] Move my card to battle',
  GetEnemyBattleCard = '[cards] Move enemy card to battle',
  DeleteMyCardFromBattle = '[cards] Delete my card from battle field',
  DecrementEnemyCardCount = '[cards] decrement enemy number of cards'
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

export class GetMyNewCards implements Action {
  public readonly type = CardsActionTypes.GetMyNewCards;

  constructor(public payload: { amount: number }) {}
}

export class GetEnemyNewCards implements Action {
  public readonly type = CardsActionTypes.GetEnemyNewCards;

  constructor(public payload: { amount: number }) {}
}

export class GetMyBattleCard implements Action {
  public readonly type = CardsActionTypes.GetMyBattleCard;

  constructor(public payload: { id: number }) {}
}

export class GetEnemyBattleCard implements Action {
  public readonly type = CardsActionTypes.GetEnemyBattleCard;

  constructor(public payload: { id: number }) {}
}

export class DeleteMyCardFromBattle implements Action {
  public readonly type = CardsActionTypes.DeleteMyCardFromBattle;

  constructor(public payload: { id: number }) {}
}

export class DecrementEnemyCardCount implements Action {
  public readonly type = CardsActionTypes.DecrementEnemyCardCount;

  constructor(public payload: { id: number }) {}
}

export type CardsActions =
  | GetCards
  | GetCardsSuccess
  | GetCardsError
  | GetMyNewCards
  | GetEnemyNewCards
  | GetMyBattleCard
  | GetEnemyBattleCard
  | DeleteMyCardFromBattle
  | DecrementEnemyCardCount;
