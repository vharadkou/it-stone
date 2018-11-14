import { createSelector, createFeatureSelector } from '@ngrx/store';

import { CardsState } from './interfaces';

const getCardState = createFeatureSelector<CardsState>('cardsState');

const GetCards = (state: CardsState) => state.cards;
const GetDeck = (state: CardsState) => state.deck;
const GetMyCards = (state: CardsState) => state.myCards;
const GetMyActiveCards = (state: CardsState) => state.myActiveCards;
const GetEnemyCardCount = (state: CardsState) => state.enemyCardCount;

const getCards = createSelector(
  getCardState,
  GetCards
);

const getDeckId = createSelector(
  getCardState,
  GetDeck
);

const getDeck = createSelector(
  getDeckId,
  getCards,
  (deckCardsId, cards) => {
    return deckCardsId.map(id => cards[id]);
  }
);

const getEnemyCardCount = createSelector(
  getCardState,
  GetEnemyCardCount
);

const getEnemyActiveCardsId = createSelector(
  getCardState,
  GetMyActiveCards
);

const getEnemyActiveCards = createSelector(
  getEnemyActiveCardsId,
  getCards,
  (enemyCardsId, cards) => {
    return enemyCardsId.map(id => cards[id]);
  }
);

const getMyCardsId = createSelector(
  getCardState,
  GetMyCards
);

const getMyCards = createSelector(
  getMyCardsId,
  getCards,
  (myCardsId, cards) => {
    return myCardsId.map(id => cards[id]);
  }
);

const getMyActiveCardsId = createSelector(
  getCardState,
  GetMyCards
);

const getMyActiveCards = createSelector(
  getMyActiveCardsId,
  getCards,
  (myActiveCardsId, cards) => {
    return myActiveCardsId.map(id => cards[id]);
  }
);

export const cardsQuery = {
  getCards,
  getCardState,
  getDeck,
  getDeckId,
  getEnemyActiveCards,
  getEnemyActiveCardsId,
  getEnemyCardCount,
  getMyActiveCards,
  getMyActiveCardsId,
  getMyCards,
  getMyCardsId
};
