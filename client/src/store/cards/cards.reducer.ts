import { CardsActions, CardsActionTypes } from './cards.action';
import { initialState } from './cards.initial';
import { CardsState } from './interfaces';
import { Status } from 'models';

type State = CardsState;

export const cardsReducer = (state: State = initialState, action: CardsActions): State => {
  switch (action.type) {
    case CardsActionTypes.GetCards:
      return {
        ...state,
        status: Status.Init
      };
    case CardsActionTypes.GetCardsSuccess:
      return {
        ...state,
        status: Status.Success
      };
    case CardsActionTypes.GetCardsError:
      return {
        ...state,
        status: Status.Error
      };
    default: return state;
  }
};
