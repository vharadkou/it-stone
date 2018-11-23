import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PlayersHPState } from './interfaces';

export const getPlayersHPState = createFeatureSelector<PlayersHPState>('playersHPState');

export const getMyHP = createSelector(
    getPlayersHPState,
    (state: PlayersHPState) => state.myHP
);

export const getEnemyHP = createSelector(
    getPlayersHPState,
    (state: PlayersHPState) => state.enemyHP
);

export const playersHPQuery = {
    getPlayersHPState,
    getMyHP,
    getEnemyHP
};
