import { cardsReducer } from './cards/cards.reducer';
import { CardsState } from './cards/interfaces';
import { PlayersHPState } from './players-hp/interfaces';
import { playersHPReducer } from './players-hp/players-hp.reducer';
import { SkillsState } from './skills/interfaces';
import { skillsReducer } from './skills/skills.reducer';
import { aboutCardsReducer } from './about-page/about-page.reducer';
import { AboutPageState } from './about-page/interfaces'
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
  skills: SkillsState;
  socket: SocketState;
  aboutPage: AboutPageState;
}

export const reducers = {
  cards: cardsReducer,
  playersHP: playersHPReducer,
  skills: skillsReducer,
  socket: socketReducer,
  aboutCards: aboutCardsReducer
};
