import { Status, Card } from 'models';

export interface CardsState {
  status: Status;
  cards: Card[];
  deck: number[];
  myCards: Card[];
  enemyCards: Card[];
  myActiveCards: Card[];
  enemyActiveCards: Card[];
  enemyCardCount: number;
}
