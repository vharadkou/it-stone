
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Card } from '../../models';

import { CardsState } from './interfaces';

const getCardState = createFeatureSelector<CardsState>('cardsState');

const GetCards = (state: CardsState) => state.cards;
const GetDeck = (state: CardsState) => state.deck;
const GetMyCards = (state: CardsState) => state.myCards;
const GetEnemyCards = (state: CardsState) => state.enemyCards;
const GetMyActiveCards = (state: CardsState) => state.myActiveCards;
const GetEnemyActiveCards = (state: CardsState) => state.enemyActiveCards;
const GetEnemyCardCount = (state: CardsState) => state.enemyCardCount;
const GetSelectedCard = (state: CardsState) => state.selectedCardId;
const GetTemplCard = (state: CardsState) => state.templCard;

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

const getTemplCard = createSelector(
  getCardState,
  GetTemplCard
);

const getSelectedCardId = createSelector(
  getCardState,
  GetSelectedCard
);

const getSelectedCard = createSelector(
  getSelectedCardId,
  getMyCards,
  getTemplCard,
  (id, myCards, templCard) => {
    let result: Card;

    if (id === 100) {
      result = JSON.parse(JSON.stringify(templCard));

      let maxId: number = 0;
      myCards.forEach((card, i) => {
          maxId = card.id > maxId ? card.id : maxId;
      });
      result.id = maxId + 1;

    } else {
      result = myCards.find(card => id === card.id);

      if (!result) {
        result = myCards[0];
        if (!result) {
          result = templCard;
        }
      }
    }

    return result;
  }
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
  getMyCardsId,
  getSelectedCard,
  getSelectedCardId
};
