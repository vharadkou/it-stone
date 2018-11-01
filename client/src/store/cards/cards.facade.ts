import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CardsState } from './interfaces';

import * as cardsQuery from './cards.selectors';

import {
  DeleteEnemyCardFromBattle,
  DeleteMyCardFromBattle,
  GetCardsToMe,
  GetCardsToEnemy,
  MoveEnemyCardToBattle,
  MoveMyCardToBattle
} from './cards.action';

@Injectable()
export class CardsFacade {
  deck$ = this.store.select(cardsQuery.getDeck);
  myCards$ = this.store.select(cardsQuery.getMyCards);
  myActiveCards$ = this.store.select(cardsQuery.getMyActiveCards);
  enemyCards$ = this.store.select(cardsQuery.getEnemyCards);
  enemyActiveCards$ = this.store.select(cardsQuery.getEnemyActiveCards);

  public constructor(private store: Store<CardsState>) {}

  getCardToMe(amount: number) {
    this.store.dispatch(new GetCardsToMe({ amount }));
  }

  getCardToEnemy(amount: number) {
    this.store.dispatch(new GetCardsToEnemy({ amount }));
  }

  moveMyCardToBattle(id: number) {
    this.store.dispatch(new MoveMyCardToBattle({ id }));
  }

  moveEnemyCardToBattle(id: number) {
    this.store.dispatch(new MoveEnemyCardToBattle({ id }));
  }

  deleteMyCardFromBattle(id: number) {
    this.store.dispatch(new DeleteMyCardFromBattle({ id }));
  }

  deleteEnemyCardFromBattle(id: number) {
    this.store.dispatch(new DeleteEnemyCardFromBattle({ id }));
  }
}
