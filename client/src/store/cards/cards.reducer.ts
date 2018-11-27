import { Status } from 'models';

import {CardsActionTypes, CardsActions } from './cards.action';
import { initialState } from './cards.initial';
import { CardsState } from './interfaces';

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
        myCards: action.payload,
        enemyCards: [...state.cards, ...action.payload]
      };

    case CardsActionTypes.LoadCardsError:
      return {
        ...state,
        status: Status.Error
      };

    case CardsActionTypes.GetMyNewCards:
      const cardsArrToMe = state.deck.splice(
        state.deck.length - action.payload.amount,
        action.payload.amount
      );
      return {
        ...state,
        deck: state.deck
      };

    case CardsActionTypes.GetEnemyNewCards:
      return {
        ...state,
        deck: state.deck,
        enemyCardCount: state.enemyCardCount + action.payload.amount
      };

    case CardsActionTypes.MoveMyCardsWithinArray:
      state.myCards.splice(action.payload.currentIndex, 0, state.myCards.splice(action.payload.previousIndex, 1)[0]);
      return {
        ...state
      };

    case CardsActionTypes.MoveEnemyCardsWithinArray:
      state.enemyCards.splice(action.payload.currentIndex, 0, state.enemyCards.splice(action.payload.previousIndex, 1)[0]);
      return {
        ...state
      };

    case CardsActionTypes.GetMyBattleCard:
      const myActiveCardsArray = state.myCards.filter((item, index, array) => {
        return array.indexOf(item) === action.payload.previousIndex;
      });
      state.myCards.splice(action.payload.previousIndex, 1);
      return {
        ...state,
        myActiveCards: [...state.myActiveCards, ...myActiveCardsArray].reverse()
      };

    case CardsActionTypes.GetEnemyBattleCard:
      const enemyActiveCardsArray = state.enemyCards.filter((item, index, array) => {
        return array.indexOf(item) === action.payload.previousIndex;
      });
      state.enemyCards.splice(action.payload.previousIndex, 1);
      return {
        ...state,
        enemyActiveCards: [...state.enemyActiveCards, ...enemyActiveCardsArray].reverse()
      };

    case CardsActionTypes.DeleteMyCardFromBattle:
      const myPrunedIds = state.myActiveCards.filter(item => {
        return item.id !== action.payload.id;
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
