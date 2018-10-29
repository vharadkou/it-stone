import {Status, Card} from 'models';

export interface CardsState {
  status: Status;
  cards: Card[];
}
