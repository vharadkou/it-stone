import { CardsState } from './cards/interfaces';
import { cardsReducer } from './cards/cards.reducer';
import { PlayersHPState } from './players-hp/interfaces';
import { playersHPReducer } from './players-hp/players-hp.reducer';
import { SkillsState } from './skills/interfaces';
import { skillsReducer } from './skills/skills.reducer';

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
}

export const reducers = {
  cards: cardsReducer,
  playersHP: playersHPReducer,
  skills: skillsReducer
};
