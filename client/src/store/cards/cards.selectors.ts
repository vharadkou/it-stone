import {
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromCard from './cards.reducer';

import { CardsState } from './interfaces';

export const getCardState = createFeatureSelector<CardsState>('cardsState');

export const getCards = createSelector(
    getCardState,
    fromCard.getCards,
);

export const getDeckId = createSelector(
    getCardState,
    fromCard.getDeckCards,
);

export const getDeck = createSelector(
    getDeckId,
    getCards,
    (deckCardsId, cards) => {
        return deckCardsId.map(id => cards[id]);
    }
)

export const getEnemyCardsId = createSelector(
    getCardState,
    fromCard.getEnemyCards,
);

export const getEnemyCards = createSelector(
    getEnemyCardsId,
    getCards,
    (enemyCardsId, cards) => {
        return enemyCardsId.map(id => cards[id])
    },
);

export const getEnemyActiveCardsId = createSelector(
    getCardState,
    fromCard.getEnemyActiveCards,
);

export const getEnemyActiveCards = createSelector(
    getEnemyActiveCardsId,
    getCards,
    (enemyCardsId, cards) => {
        return enemyCardsId.map(id => cards[id])
    },
);

export const getMyCardsId = createSelector(
    getCardState,
    fromCard.getMyCards,
);

export const getMyCards = createSelector(
    getMyCardsId,
    getCards,
    (myCardsId, cards) => {
        return myCardsId.map(id => cards[id])
    }
);

export const getMyActiveCardsId = createSelector(
    getCardState,
    fromCard.getMyCards,
);

export const getMyActiveCards = createSelector(
    getMyActiveCardsId,
    getCards,
    (myActiveCardsId, cards) => {
        return myActiveCardsId.map(id => cards[id])
    }
);
