import { Status } from 'models';
import { CardsState } from './interfaces';

export const initialState: CardsState = {
  status: Status.Init,
  cards: [],
  deck: [1, 2, 3],
  myCards: [],
  enemyCards: [],
  enemyActiveCards: [],
  enemyCardCount: 0,
  myActiveCards: [],
};
