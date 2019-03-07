import { Status } from 'models';

import { AboutPageActionTypes,  AboutPageActions} from './about-page.action';
import { initialPageState } from './about-page.initial';
import { AboutPageState } from './interfaces';

export const aboutCardsReducer = (
  state: AboutPageState = initialPageState,
  action: AboutPageActions
): AboutPageState => {
  switch (action.type) {
    case AboutPageActionTypes.LoadAboutCards:
      return {
        ...state,
      };

    case AboutPageActionTypes.LoadAboutCardsSuccess:
      return {
        ...state,
        status: Status.Success,
        developers:action.payload,
      };

    case AboutPageActionTypes.LoadAboutCardsError:
      return {
        ...state,
        status: Status.Error
      };

    default:
      return state;
  }
};
