import { CardsActions, CardsActionTypes } from './cards.action';
import { initialState } from './cards.initial';
import { CardsState } from './interfaces';
import { Status } from 'models';

type State = CardsState;

export const cardsReducer = (
  state: State = initialState,
  action: CardsActions
): State => {
  switch (action.type) {
    case CardsActionTypes.GetCards:
      return {
        ...state,
        status: Status.Init
      };

    case CardsActionTypes.GetCardsSuccess:
      return {
        ...state,
        status: Status.Success,
        cards: action.payload
      };

    case CardsActionTypes.GetCardsError:
      return {
        ...state,
        status: Status.Error
      };

    case CardsActionTypes.GetCardsFromDeckToMe:
      const cardsArrToMe = state.deck.splice(
        state.deck.length - action.payload.amount,
        action.payload.amount
      );
      return {
        ...state,
        deck: state.deck,
        myCards: [...state.myCards, ...cardsArrToMe]
      };

    case CardsActionTypes.GetCardsFromDeckToEnemy:
      const cardsArrToEnemy = state.deck.splice(
        state.deck.length - action.payload.amount,
        action.payload.amount
      );
      return {
        ...state,
        deck: state.deck,
        enemyCards: [...state.enemyCards, ...cardsArrToEnemy]
      };

    case CardsActionTypes.MoveMyCardToBattle:
      return {
        ...state,
        myActiveCards: [...state.myActiveCards, action.payload.id]
      };

    case CardsActionTypes.MoveEnemyCardToBattle:
      return {
        ...state,
        myActiveCards: [...state.enemyActiveCards, action.payload.id]
      };

    case CardsActionTypes.DeleteMyCardFromBattle:
      const myPrunedIds = state.myActiveCards.filter(item => {
        return item !== action.payload.id;
      });
      return {
        ...state,
        myActiveCards: myPrunedIds
      };

    case CardsActionTypes.DeleteEnemyCardFromBattle:
      const enemyPrunedIds = state.enemyActiveCards.filter(item => {
        return item !== action.payload.id;
      });
      return {
        ...state,
        myActiveCards: enemyPrunedIds
      };

    default:
      return state;
  }
};

export const getCards = (state: State) => state.cards;
export const getDeckCards = (state: State) => state.deck;
export const getMyCards = (state: State) => state.myCards;
export const getMyActiveCards = (state: State) => state.myActiveCards;
export const getEnemyCards = (state: State) => state.enemyCards;
export const getEnemyActiveCards = (state: State) => state.enemyActiveCards;
