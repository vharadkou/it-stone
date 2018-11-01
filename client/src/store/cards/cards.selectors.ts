import {
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromCard from './cards.reducer';

import { CardsState } from './interfaces';

const getCardState = createFeatureSelector<CardsState>('cardsState');

const getCards = createSelector(
    getCardState,
    fromCard.getCards,
);

const getDeckId = createSelector(
    getCardState,
    fromCard.getDeckCards,
);

const getDeck = createSelector(
    getDeckId,
    getCards,
    (deckCardsId, cards) => {
        return deckCardsId.map(id => cards[id]);
    }
)

const getEnemyCardsId = createSelector(
    getCardState,
    fromCard.getEnemyCards,
);

const getEnemyCards = createSelector(
    getEnemyCardsId,
    getCards,
    (enemyCardsId, cards) => {
        return enemyCardsId.map(id => cards[id])
    },
);

const getEnemyActiveCardsId = createSelector(
    getCardState,
    fromCard.getEnemyActiveCards,
);

const getEnemyActiveCards = createSelector(
    getEnemyActiveCardsId,
    getCards,
    (enemyCardsId, cards) => {
        return enemyCardsId.map(id => cards[id])
    },
);

const getMyCardsId = createSelector(
    getCardState,
    fromCard.getMyCards,
);

const getMyCards = createSelector(
    getMyCardsId,
    getCards,
    (myCardsId, cards) => {
        return myCardsId.map(id => cards[id])
    }
);

const getMyActiveCardsId = createSelector(
    getCardState,
    fromCard.getMyCards,
);

const getMyActiveCards = createSelector(
    getMyActiveCardsId,
    getCards,
    (myActiveCardsId, cards) => {
        return myActiveCardsId.map(id => cards[id])
    }
);

export const cardsQuery = {
    getCards,
    getCardState,
    getDeck,
    getDeckId,
    getEnemyActiveCards,
    getEnemyActiveCardsId,
    getEnemyCards,
    getEnemyCardsId,
    getMyActiveCards,
    getMyActiveCardsId,
    getMyCards,
    getMyCardsId,
}
