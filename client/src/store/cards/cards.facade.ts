import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Card, CardForStart, PopupTextContent } from 'models';

import {
  ChangeMyFirstCards,
  ChangeSelectedCardId,
  CheckNewCardDataLoss,
  DecreaceEnemyCardHP,
  DecreaceMyCardHPWithMyAttack,
  DeleteCard,
  DeleteEnemyCardFromBattle,
  DeleteMyCardFromBattle,
  GetEnemyBattleCard,
  GetEnemyNewCards,
  GetMyBattleCard,
  GetMyCardInHand,
  GetMyFirstCards,
  GetMyNewCards,
  IncreaceMyCardAttack,
  IncreaceMyCardHP,
  LoadCards,
  MoveEnemyActiveCardsWithinArray,
  MoveEnemyCardsWithinArray,
  MoveMyActiveCardsWithinArray,
  MoveMyCardsWithinArray,
  ShowDeleteCardPopup,
  ShowNewCardPopup,
  UpdateCard,
  UploadCard,
  ChangeCardEffects,
  AddSomeBonus,
  RemoveSomeBonus,
} from './cards.action';
import { cardsQuery } from './cards.selectors';
import { CardsState } from './interfaces';

@Injectable()
export class CardsFacade {
  public allCards$ = this.store.select(cardsQuery.getCards);
  public myCardsForChoosing$ = this.store.select(cardsQuery.getMyCardsForChoosing);
  public deck$ = this.store.select(cardsQuery.getDeck);
  public myCards$ = this.store.select(cardsQuery.getMyCards);
  public myCardsInHand$ = this.store.select(cardsQuery.getMyCardsInHand);
  public enemyCards$ = this.store.select(cardsQuery.getEnemyCards);
  public enemyCardCount$ = this.store.select(cardsQuery.getEnemyCardCount);
  public myActiveCards$ = this.store.select(cardsQuery.getMyActiveCards);
  public enemyActiveCards$ = this.store.select(cardsQuery.getEnemyActiveCards);
  //public selectedCard$ = this.store.select(cardsQuery.getSelectedCard);
  public selectedCardId$ = this.store.select(cardsQuery.getSelectedCardId);

  public constructor(private store: Store<CardsState>) { }

  public loadCards(): void {
    this.store.dispatch(new LoadCards());
  }

  public getMyNewCards(amount: number): void {
    this.store.dispatch(new GetMyNewCards({ amount }));
  }

  public GetMyFirstCards(amount: number): void {
    this.store.dispatch(new GetMyFirstCards(amount));
  }

  public changeMyFirstCards(cards: CardForStart[]): void {
    this.store.dispatch(new ChangeMyFirstCards(cards));
  }

  public getEnemyNewCards(amount: number): void {
    this.store.dispatch(new GetEnemyNewCards({ amount }));
  }

  public moveMyCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.store.dispatch(new MoveMyCardsWithinArray(event));
  }

  public moveEnemyCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.store.dispatch(new MoveEnemyCardsWithinArray(event));
  }

  public moveMyActiveCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.store.dispatch(new MoveMyActiveCardsWithinArray(event));
  }

  public moveEnemyActiveCardsWithinArray(event: CdkDragDrop<Card[]>): void {
    this.store.dispatch(new MoveEnemyActiveCardsWithinArray(event));
  }

  public getMyCardInHand(event: Card): void {
    this.store.dispatch(new GetMyCardInHand(event));
  }

  public getMyBattleCard(event: CdkDragDrop<Card[]>, move: number): void {
    this.store.dispatch(new GetMyBattleCard({event, move}));
  }

  public getEnemyBattleCard(): void {
    this.store.dispatch(new GetEnemyBattleCard());
  }

  public deleteMyCardFromBattle(id: string): void {
    this.store.dispatch(new DeleteMyCardFromBattle({ id }));
  }

  public deleteCard(id: string): void {
    this.store.dispatch(new DeleteCard({ id }));
  }

  public uploadCard(card: Card): void {
    this.store.dispatch(new UploadCard({ card }));
  }

  public updateCard(card: Card): void {
    this.store.dispatch(new UpdateCard({ card }));
  }

  public changeSelectedCardId(id: string, card?: Card): void {
    this.store.dispatch(new ChangeSelectedCardId({ id, card }));
  }

  public showDeleteCardPopup(textContent: PopupTextContent, id: string): void {
    this.store.dispatch(new ShowDeleteCardPopup({ textContent, id }));
  }

  public showNewCardPopup(textContent: PopupTextContent, id: string, card: Card): void {
    this.store.dispatch(new ShowNewCardPopup({ textContent, id, card }));
  }

  public checkNewCardDataLoss(textContent: PopupTextContent, id: string, form: NgForm, card?: Card): void {
    this.store.dispatch(new CheckNewCardDataLoss({ textContent, id, card, form }));
  }

  public increaceMyCardAttack(array: Card[]): void {
    this.store.dispatch(new IncreaceMyCardAttack({array}));
  }

  public increaceMyCardHP(card: Card, amount: number): void {
    this.store.dispatch(new IncreaceMyCardHP({ card, amount }));
  }

  public decreaceEnemyCardHP(myCardId: string, enemyCardId: string, userCardDamage: number): void {
    this.store.dispatch(new DecreaceEnemyCardHP({ myCardId, enemyCardId, userCardDamage }));
  }

  public decreaceMyCardHPWithMyAttack(myCardId: string, enemyCardId: string): void {
    this.store.dispatch(new DecreaceMyCardHPWithMyAttack({ myCardId, enemyCardId }));
  }

  public deleteEnemyCardFromBattle(id: string): void {
    this.store.dispatch(new DeleteEnemyCardFromBattle({ id}));
  }

  public changeCardEffects(id: string, effects: { [name: string]: any }): void {
    this.store.dispatch(new ChangeCardEffects({ id, effects }))
  }

  public addSomeBonus(card : Card):void{
    this.store.dispatch(new AddSomeBonus({card}));
  }

  public removeSomeBonus(card: Card): void{
    this.store.dispatch(new RemoveSomeBonus({card}));
  }
}
