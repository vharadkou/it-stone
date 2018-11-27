import { createSelector, createFeatureSelector } from '@ngrx/store';

import { CardsState } from './interfaces';

const getCardState = createFeatureSelector<CardsState>('cardsState');

const GetCards = (state: CardsState) => state.cards;
const GetDeck = (state: CardsState) => state.deck;
const GetMyCards = (state: CardsState) => state.myCards;
const GetEnemyCards = (state: CardsState) => state.enemyCards;
const GetMyActiveCards = (state: CardsState) => state.myActiveCards;
const GetEnemyActiveCards = (state: CardsState) => state.enemyActiveCards;
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

const getEnemyCards = createSelector(
  getCardState,
  GetEnemyCards
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
  getCardState,
  GetEnemyActiveCards
);

const getMyCardsId = createSelector(
  getCardState,
  GetMyCards
);

const getMyCards = createSelector(
  getCardState,
  GetMyCards
);

const getMyActiveCardsId = createSelector(
  getCardState,
  GetMyCards
);

const getMyActiveCards = createSelector(
  getCardState,
  GetMyActiveCards
);

export const cardsQuery = {
  getCards,
  getCardState,
  getDeck,
  getDeckId,
  getEnemyCards,
  getEnemyActiveCards,
  getEnemyActiveCardsId,
  getEnemyCardCount,
  getMyActiveCards,
  getMyActiveCardsId,
  getMyCards,
  getMyCardsId
};
