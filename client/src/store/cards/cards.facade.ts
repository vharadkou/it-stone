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
  DeleteEnemyCardFromBattle,
} from './cards.action';

@Injectable()
export class CardsFacade {
  deck$ = this.store.select(cardsQuery.getDeck);
  myCards$ = this.store.select(cardsQuery.getMyCards);
  enemyCardCount$ = this.store.select(cardsQuery.getEnemyCardCount);
  myActiveCards$ = this.store.select(cardsQuery.getMyActiveCards);
  enemyActiveCards$ = this.store.select(cardsQuery.getEnemyActiveCards);

  public constructor(private store: Store<CardsState>) {}

  getMyNewCards(amount: number) {
    this.store.dispatch(new GetMyNewCards({ amount }));
  }

  getEnemyNewCards(amount: number) {
    this.store.dispatch(new GetEnemyNewCards({ amount }));
  }

  getMyBattleCard(id: number) {
    this.store.dispatch(new GetMyBattleCard({ id }));
  }

  getEnemyBattleCard(id: number) {
    this.store.dispatch(new GetEnemyBattleCard({ id }));
  }

  deleteMyCardFromBattle(id: number) {
    this.store.dispatch(new DeleteMyCardFromBattle({ id }));
  }

  deleteEnemyCardFromBattle(id: number) {
    this.store.dispatch(new DeleteEnemyCardFromBattle({ id }));
  }
}
