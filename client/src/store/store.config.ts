import { aboutCardsReducer } from './about-page/about-page.reducer';
import { AboutPageState } from './about-page/interfaces';
import { cardsReducer } from './cards/cards.reducer';
import { CardsState } from './cards/interfaces';
import {gameProcessReduser} from './game-process/game-process.reduser';
import { GameProcessState} from './game-process/interfaces';
import { PlayersHPState } from './players-hp/interfaces';
import { playersHPReducer } from './players-hp/players-hp.reducer';
import { SkillsState } from './skills/interfaces';
import { skillsReducer } from './skills/skills.reducer';
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
  gameProcess: GameProcessState;
}

export const reducers = {
  cards: cardsReducer,
  playersHP: playersHPReducer,
  skills: skillsReducer,
  socket: socketReducer,
  aboutCards: aboutCardsReducer,
  gameProcess: gameProcessReduser
};
