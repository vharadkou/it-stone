import { Status, Card } from 'models';

export interface CardsState {
  status: Status;
  ids: number[];
  cards: Card[];
  deck: number[];
  myCards: number[];
  myActiveCards: number[];
  enemyCards: number[];
  enemyActiveCards: number[];
}
