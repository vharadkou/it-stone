import { Status } from 'models';
import { CardsState } from './interfaces';

type State = CardsState;

export const initialState: State = {
  status: Status.Init,
  cards: []
};
