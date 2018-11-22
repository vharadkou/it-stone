import { CardsActions, CardsActionTypes } from './cards.action';
import { initialState } from './cards.initial';
import { CardsState } from './interfaces';
import { Status } from 'models';

export const cardsReducer = (
  state: CardsState = initialState,
  action: CardsActions
): CardsState => {
  switch (action.type) {
    case CardsActionTypes.LoadCards:
      return {
        ...state,
        status: Status.Init
      };

    case CardsActionTypes.LoadCardsSuccess:
      return {
        ...state,
        status: Status.Success,
        cards: [...state.cards, ...action.payload]
      };

    case CardsActionTypes.LoadCardsError:
      return {
        ...state,
        cards: state.cards,
        status: Status.Error
      };

    case CardsActionTypes.GetMyNewCards:
      const cardsArrToMe = state.deck.splice(
        state.deck.length - action.payload.amount,
        action.payload.amount
      );
      return {
        ...state,
        deck: state.deck,
        myCards: [...state.myCards, ...cardsArrToMe]
      };

    case CardsActionTypes.GetEnemyNewCards:
      return {
        ...state,
        deck: state.deck,
        enemyCardCount: state.enemyCardCount + action.payload.amount
      };

    case CardsActionTypes.GetMyBattleCard:
      return {
        ...state,
        myActiveCards: [...state.myActiveCards, action.payload.id]
      };

    case CardsActionTypes.DeleteMyCardFromBattle:
      const myPrunedIds = state.myActiveCards.filter(item => {
        return item !== action.payload.id;
      });
      return {
        ...state,
        myActiveCards: myPrunedIds
      };

    case CardsActionTypes.DecrementEnemyCardCount:
      if (state.enemyCardCount > 0) {
        const enemyPrunedIds = state.enemyCardCount--;
        return {
          ...state,
          enemyCardCount: enemyPrunedIds
        };
      }
      return {
        ...state
      };

    default:
      return state;
  }
};
