import { Status } from 'models';

import { HeroActionTypes,  HeroActions} from './hero.action';
import { initialHeroState } from './hero.initial';
import { HeroState } from './interfaces';

export const heroReducer = (
  state: HeroState = initialHeroState,
  action: HeroActions
): HeroState => {
  switch (action.type) {
    case HeroActionTypes.LoadHero:
      return {
        ...state,
      };

    case HeroActionTypes.LoadHeroSuccess:
      return {
        ...state,
        status: Status.Success,
        heroes:action.payload,
      };

    case HeroActionTypes.LoadHeroError:
      return {
        ...state,
        status: Status.Error
      };

    default:
      return state;
  }
};