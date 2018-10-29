import { CardsState } from './cards/interfaces';
import { cardsReducer } from './cards/cards.reducer';

export enum Status {
  Initial,
  Loading,
  Success,
  Error
}

export interface State {
  cards: CardsState;
}

export const reducers = {
  cards: cardsReducer
};
