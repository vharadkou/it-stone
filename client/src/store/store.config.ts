import { cardsReducer } from './cards/cards.reducer';
import { CardsState } from './cards/interfaces';
import { PlayersHPState } from './players-hp/interfaces';
import { playersHPReducer } from './players-hp/players-hp.reducer';
import { SocketState, socketReducer } from './socket';

export enum Status {
  Initial,
  Loading,
  Success,
  Error
}

export interface State {
  cards: CardsState;
  playersHP: PlayersHPState;
  socket: SocketState;
}

export const reducers = {
  cards: cardsReducer,
  playersHP: playersHPReducer,
  socket: socketReducer
};
