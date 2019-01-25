import { Action } from '@ngrx/store';

import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Card } from 'models';

export enum CardsActionTypes {
  LoadCards = '[cards] Load Cards',
  LoadCardsSuccess = '[cards] Load Cards (Success)',
  LoadCardsError = '[cards] Load Cards (Error)',
  GetMyNewCards = '[cards] Move cards to me from deck',
  GetEnemyNewCards = '[cards] Move cards to enemy from deck',
  MoveMyCardsWithinArray = '[card] Move My Cards Within Array',
  MoveEnemyCardsWithinArray = '[card] Move Enemy Cards Within Array',
  GetMyBattleCard = '[cards] Move my card to battle',
  GetEnemyBattleCard = '[cards] Move enemy card to battle',
  DeleteMyCardFromBattle = '[cards] Delete my card from battle field',
  DecrementEnemyCardCount = '[cards] decrement enemy number of cards',
  DeleteCard = '[cards] Delete card from Cards list',
  UploadCard = '[cards] Upload new card to Cards list',
  ChangeSelectedCardId = '[cards] Change selected card id'
}

export class LoadCards implements Action {
  public readonly type = CardsActionTypes.LoadCards;
}

export class LoadCardsSuccess implements Action {
  public readonly type = CardsActionTypes.LoadCardsSuccess;

  constructor(public payload: Card[]) {}
}

export class LoadCardsError implements Action {
  public readonly type = CardsActionTypes.LoadCardsError;

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

export class MoveMyCardsWithinArray implements Action {
  public readonly type = CardsActionTypes.MoveMyCardsWithinArray;

  constructor(public payload: CdkDragDrop<Card[]>) {}
}

export class MoveEnemyCardsWithinArray implements Action {
  public readonly type = CardsActionTypes.MoveEnemyCardsWithinArray;

  constructor(public payload: CdkDragDrop<Card[]>) {}
}

export class GetMyBattleCard implements Action {
  public readonly type = CardsActionTypes.GetMyBattleCard;

  constructor(public payload: CdkDragDrop<Card[]>) {}
}

export class GetEnemyBattleCard implements Action {
  public readonly type = CardsActionTypes.GetEnemyBattleCard;

  constructor(public payload: CdkDragDrop<Card[]>) {}
}

export class DeleteMyCardFromBattle implements Action {
  public readonly type = CardsActionTypes.DeleteMyCardFromBattle;

  constructor(public payload: { id: number }) {}
}

export class DecrementEnemyCardCount implements Action {
  public readonly type = CardsActionTypes.DecrementEnemyCardCount;

  constructor(public payload: { id: number }) {}
}

export class DeleteCard implements Action {
  public readonly type = CardsActionTypes.DeleteCard;

  constructor(public payload: { id: number }) {}
}

export class UploadCard implements Action {
  public readonly type = CardsActionTypes.UploadCard;

  constructor(public payload: { card: Card }) {}
}

export class ChangeSelectedCardId implements Action {
  public readonly type = CardsActionTypes.ChangeSelectedCardId;

  constructor(public payload: { id: number }) {}
}

export type CardsActions =
  | LoadCards
  | LoadCardsSuccess
  | LoadCardsError
  | GetMyNewCards
  | GetEnemyNewCards
  | MoveMyCardsWithinArray
  | MoveEnemyCardsWithinArray
  | GetMyBattleCard
  | GetEnemyBattleCard
  | DeleteMyCardFromBattle
  | DecrementEnemyCardCount
  | DeleteCard
  | UploadCard
  | ChangeSelectedCardId;
