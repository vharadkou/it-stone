
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Card } from 'models';

import { CardsState } from './interfaces';

import { cardsQuery } from './cards.selectors';

import {
  ChangeSelectedCardId,
  DeleteCard,
  DeleteMyCardFromBattle,
  GetEnemyBattleCard,
  GetEnemyNewCards,
  GetMyBattleCard,
  GetMyNewCards,
  LoadCards,
  MoveEnemyCardsWithinArray,
  MoveMyCardsWithinArray,
  UploadCard
} from './cards.action';

@Injectable()
export class CardsFacade {
  public allCards$ = this.store.select(cardsQuery.getCards);
  public deck$ = this.store.select(cardsQuery.getDeck);
  public myCards$ = this.store.select(cardsQuery.getMyCards);
  public enemyCards$ = this.store.select(cardsQuery.getEnemyCards);
  public enemyCardCount$ = this.store.select(cardsQuery.getEnemyCardCount);
  public myActiveCards$ = this.store.select(cardsQuery.getMyActiveCards);
  public enemyActiveCards$ = this.store.select(cardsQuery.getEnemyActiveCards);
  public selectedCard$ = this.store.select(cardsQuery.getSelectedCard);
  public selectedCardId$ = this.store.select(cardsQuery.getSelectedCardId);

  public constructor(private store: Store<CardsState>) {}

  public loadCards(): void {
    this.store.dispatch(new LoadCards());
  }

  public getMyNewCards(amount: number): void {
    this.store.dispatch(new GetMyNewCards({ amount }));
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

  public getMyBattleCard(event: CdkDragDrop<Card[]>): void {
    this.store.dispatch(new GetMyBattleCard(event));
  }

  public getEnemyBattleCard(event: CdkDragDrop<Card[]>): void {
    this.store.dispatch(new GetEnemyBattleCard(event));
  }

  public deleteMyCardFromBattle(id: number): void {
    this.store.dispatch(new DeleteMyCardFromBattle({ id }));
  }

  public deleteCard(id: number): void {
    this.store.dispatch(new DeleteCard({ id }));
  }

  public uploadCard(card: Card): void {
    this.store.dispatch(new UploadCard({ card }));
  }

  public changeSelectedCardId(id: number): void {
    this.store.dispatch(new ChangeSelectedCardId({ id }));
  }
}
