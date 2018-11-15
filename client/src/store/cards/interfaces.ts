import { Status, Card } from 'models';

export interface CardsState {
  status: Status;
  cards: Card[];
  deck: number[];
  myCards: number[];
  myActiveCards: number[];
  enemyActiveCards: number[];
  enemyCardCount: number;
}
