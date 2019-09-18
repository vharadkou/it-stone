import { Action } from '@ngrx/store';

import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { NgForm } from '@angular/forms';
import { Card,CardForStart, PopupTextContent } from 'models';

export enum CardsActionTypes {
  LoadCards = '[cards] Load Cards',
  LoadCardsSuccess = '[cards] Load Cards (Success)',
  LoadCardsError = '[cards] Load Cards (Error)',
  GetMyNewCards = '[cards] Move cards to me from deck',
  GetEnemyNewCards = '[cards] Move cards to enemy from deck',
  GetMyFirstCards = '[cards] Get my first cards in hand',
  ChangeMyFirstCards = '[cards] Change my first cards in hand',
  MoveMyCardsWithinArray = '[card] Move My Cards Within Array',
  MoveEnemyCardsWithinArray = '[card] Move Enemy Cards Within Array',
  MoveMyActiveCardsWithinArray = '[card] Move My Active Cards Within Array',
  MoveEnemyActiveCardsWithinArray = '[card] Move Enemy Active Cards Within Array',
  GetMyCardInHand = '[cards] Move my card to hand',
  GetMyBattleCard = '[cards] Move my card to battle',
  GetEnemyBattleCard = '[cards] Move enemy card to battle',
  DeleteMyCardFromBattle = '[cards] Delete my card from battle field',
  DeleteEnemyCardFromBattle = '[cards] Delete enemy card from battle field',
  DecrementEnemyCardCount = '[cards] decrement enemy number of cards',
  DeleteCard = '[cards] Delete card from Cards list',
  DeleteCardSuccess = '[cards] Delete card from Cards list (Success)',
  DeleteCardError = '[cards] Delete card from Cards list (Error)',
  UploadCard = '[cards] Upload new card to Cards list',
  UploadCardSuccess = '[cards] Upload new card to Cards list (Success)',
  UploadCardError = '[cards] Upload new card to Cards list (Error)',
  UpdateCard = '[cards] Update card in cards list',
  UpdateCardSuccess = '[cards] Update card in cards list (Success)',
  UpdateCardError = '[cards] Update card in cards list (Error)',
  ChangeSelectedCardId = '[cards] Change selected card id',
  ShowDeleteCardPopup = '[cards] Show delete card popup',
  ShowNewCardPopup = '[cards] Show new card popup',
  CheckNewCardDataLoss = '[cards] Check if NewCard data will loss',
  IncreaceMyCardAttack = '[cards] Increace my card attack',
  IncreaceMyCardHP = '[cards] Increace my card HP',
  DecreaceEnemyCardHP = '[cards] Decreace enemy card HP',
  DecreaceMyCardHPWithMyAttack = '[cards] Decreace my card HP when I am attack enemy card',
  ChangeCardEffects = '[cards] Change effects of card',
  AddSomeBonus = '[cards] Add some bonus',
  RemoveSomeBonus = '[cards] Remove some bonus',
}

export class LoadCards implements Action {
  public readonly type = CardsActionTypes.LoadCards;
}

export class LoadCardsSuccess implements Action {
  public readonly type = CardsActionTypes.LoadCardsSuccess;

  constructor(public payload: Card[]) { }
}

export class LoadCardsError implements Action {
  public readonly type = CardsActionTypes.LoadCardsError;

  constructor(public payload: Error) { }
}

export class GetMyCardInHand implements Action {
  public readonly type = CardsActionTypes.GetMyCardInHand;

  constructor(public payload: Card) { }
}

export class GetMyFirstCards implements Action {
  public readonly type = CardsActionTypes.GetMyFirstCards;

  constructor(public payload: number) { }
}

export class ChangeMyFirstCards implements Action {
  public readonly type = CardsActionTypes.ChangeMyFirstCards;

  constructor(public payload: CardForStart[]) { }
}

export class GetMyNewCards implements Action {
  public readonly type = CardsActionTypes.GetMyNewCards;

  constructor(public payload: { amount: number }) { }
}

export class GetEnemyNewCards implements Action {
  public readonly type = CardsActionTypes.GetEnemyNewCards;

  constructor(public payload: { amount: number }) { }
}

export class MoveMyCardsWithinArray implements Action {
  public readonly type = CardsActionTypes.MoveMyCardsWithinArray;

  constructor(public payload: CdkDragDrop<Card[]>) { }
}

export class MoveEnemyCardsWithinArray implements Action {
  public readonly type = CardsActionTypes.MoveEnemyCardsWithinArray;

  constructor(public payload: CdkDragDrop<Card[]>) { }
}

export class MoveMyActiveCardsWithinArray implements Action {
  public readonly type = CardsActionTypes.MoveMyActiveCardsWithinArray;

  constructor(public payload: CdkDragDrop<Card[]>) { }
}

export class MoveEnemyActiveCardsWithinArray implements Action {
  public readonly type = CardsActionTypes.MoveEnemyActiveCardsWithinArray;

  constructor(public payload: CdkDragDrop<Card[]>) { }
}

export class GetMyBattleCard implements Action {
  public readonly type = CardsActionTypes.GetMyBattleCard;

  constructor(public payload: {event: CdkDragDrop<Card[]>, move: number}) { }
}

export class GetEnemyBattleCard implements Action {
  public readonly type = CardsActionTypes.GetEnemyBattleCard;

  
}

export class DeleteMyCardFromBattle implements Action {
  public readonly type = CardsActionTypes.DeleteMyCardFromBattle;

  constructor(public payload: { id: number }) { }
}

export class DecrementEnemyCardCount implements Action {
  public readonly type = CardsActionTypes.DecrementEnemyCardCount;

  constructor(public payload: { id: number }) { }
}

export class DeleteCard implements Action {
  public readonly type = CardsActionTypes.DeleteCard;

  constructor(public payload: { id: number }) {}
}

export class DeleteCardSuccess implements Action {
  public readonly type = CardsActionTypes.DeleteCardSuccess;

  constructor(public payload: { id: number }) {}
}

export class DeleteCardError implements Action {
  public readonly type = CardsActionTypes.DeleteCardError;

  constructor(public payload: Error) {}
}

export class UploadCard implements Action {
  public readonly type = CardsActionTypes.UploadCard;

  constructor(public payload: { card: Card }) {}
}

export class UploadCardSuccess implements Action {
  public readonly type = CardsActionTypes.UploadCardSuccess;

  constructor(public payload: { card: Card }) {}
}

export class UploadCardError implements Action {
  public readonly type = CardsActionTypes.UploadCardError;

  constructor(public payload: Error) {}
}

export class UpdateCard implements Action {
  public readonly type = CardsActionTypes.UpdateCard;

  constructor(public payload: { card: Card }) {}
}

export class UpdateCardSuccess implements Action {
  public readonly type = CardsActionTypes.UpdateCardSuccess;
}

export class UpdateCardError implements Action {
  public readonly type = CardsActionTypes.UpdateCardError;

  constructor(public payload: Error) {}
}

export class ChangeSelectedCardId implements Action {
  public readonly type = CardsActionTypes.ChangeSelectedCardId;

  constructor(public payload: { id: number, card?: Card }) {}
}

export class ShowDeleteCardPopup implements Action {
  public readonly type = CardsActionTypes.ShowDeleteCardPopup;

  constructor(public payload: { textContent: PopupTextContent, id: number }) {}
}

export class ShowNewCardPopup implements Action {
  public readonly type = CardsActionTypes.ShowNewCardPopup;

  constructor(public payload: { textContent: PopupTextContent, id: number, card?: Card }) {}
}

export class CheckNewCardDataLoss implements Action {
  public readonly type = CardsActionTypes.CheckNewCardDataLoss;

  constructor(public payload: { textContent: PopupTextContent, id: number, form: NgForm, card?: Card }) {}
}

export class IncreaceMyCardAttack implements Action {
  public readonly type = CardsActionTypes.IncreaceMyCardAttack;

  constructor(public payload: {array: Card[] }) {}
}

export class IncreaceMyCardHP implements Action {
  public readonly type = CardsActionTypes.IncreaceMyCardHP;

  constructor(public payload: { card: Card, amount: number }) {}
}

export class DecreaceEnemyCardHP implements Action {
  public readonly type = CardsActionTypes.DecreaceEnemyCardHP;

  constructor(public payload: { myCardId: string,  enemyCardId: string, userCardDamage: number }) {}
}

export class DecreaceMyCardHPWithMyAttack implements Action {
  public readonly type = CardsActionTypes.DecreaceMyCardHPWithMyAttack;

  constructor(public payload: { myCardId: string,  enemyCardId: string }) {}
}

export class DeleteEnemyCardFromBattle implements Action {
  public readonly type = CardsActionTypes.DeleteEnemyCardFromBattle;

  constructor(public payload: { id: number }) {}
}

export class ChangeCardEffects implements Action {
  public readonly type = CardsActionTypes.ChangeCardEffects;

  constructor(public payload: { id: number, effects: { [name: string]: any } }) {}
}

export class AddSomeBonus implements Action {
  public readonly type = CardsActionTypes.AddSomeBonus;

  constructor(public payload: {card: Card}) {}
}

export class RemoveSomeBonus implements Action {
  public readonly type = CardsActionTypes.RemoveSomeBonus;

  constructor(public payload: {card: Card}) {}
}

export type CardsActions =
  | LoadCards
  | LoadCardsSuccess
  | LoadCardsError
  | GetMyCardInHand
  | GetMyNewCards
  | GetEnemyNewCards
  | GetMyFirstCards
  | ChangeMyFirstCards
  | MoveMyCardsWithinArray
  | MoveEnemyCardsWithinArray
  | MoveMyActiveCardsWithinArray
  | MoveEnemyActiveCardsWithinArray
  | GetMyBattleCard
  | GetEnemyBattleCard
  | DeleteMyCardFromBattle
  | DeleteEnemyCardFromBattle
  | DecrementEnemyCardCount
  | DeleteCard
  | DeleteCardSuccess
  | DeleteCardError
  | UploadCard
  | UploadCardSuccess
  | UploadCardError
  | UpdateCard
  | UpdateCardSuccess
  | UpdateCardError
  | ChangeSelectedCardId
  | ShowDeleteCardPopup
  | ShowNewCardPopup
  | CheckNewCardDataLoss
  | IncreaceMyCardAttack
  | IncreaceMyCardHP
  | DecreaceEnemyCardHP
  | DecreaceMyCardHPWithMyAttack
  | ChangeCardEffects
  | AddSomeBonus
  | RemoveSomeBonus;
