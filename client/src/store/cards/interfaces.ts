import { Status, Card } from 'models';

export interface CardsState {
  status: Status;
  cards: { [id: number]: Card };
  deck: number[];
  myCards: number[];
  myActiveCards: number[];
  enemyCards: number[];
  enemyActiveCards: number[];
}
