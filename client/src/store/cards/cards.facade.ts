import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CardsState } from './interfaces';

import { cardsQuery } from './cards.selectors';

import {
  GetMyNewCards,
  GetEnemyNewCards,
  GetMyBattleCard,
  GetEnemyBattleCard,
  DeleteMyCardFromBattle,
  GetCards
} from './cards.action';

@Injectable()
export class CardsFacade {
  public allCards$ = this.store.select(cardsQuery.getCards);
  public deck$ = this.store.select(cardsQuery.getDeck);
  public myCards$ = this.store.select(cardsQuery.getMyCards);
  public enemyCardCount$ = this.store.select(cardsQuery.getEnemyCardCount);
  public myActiveCards$ = this.store.select(cardsQuery.getMyActiveCards);
  public enemyActiveCards$ = this.store.select(cardsQuery.getEnemyActiveCards);

  public constructor(private store: Store<CardsState>) {}

  public getCards(): void {
    this.store.dispatch(new GetCards());
  }

  public getMyNewCards(amount: number): void {
    this.store.dispatch(new GetMyNewCards({ amount }));
  }

  public getEnemyNewCards(amount: number): void {
    this.store.dispatch(new GetEnemyNewCards({ amount }));
  }

  public getMyBattleCard(id: number): void {
    this.store.dispatch(new GetMyBattleCard({ id }));
  }

  public getEnemyBattleCard(id: number): void {
    this.store.dispatch(new GetEnemyBattleCard({ id }));
  }

  public deleteMyCardFromBattle(id: number): void {
    this.store.dispatch(new DeleteMyCardFromBattle({ id }));
  }
}
