import { Status } from 'models';
import { CardsState } from './interfaces';

type State = CardsState;

export const initialState: State = {
  status: Status.Init,
  ids: [],
  cards: [],
  deck: [],
  myCards: [],
  enemyActiveCards: [],
  enemyCards: [],
  myActiveCards: [],
};
