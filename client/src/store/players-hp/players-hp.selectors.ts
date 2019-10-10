import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PlayersHPState } from './interfaces';

export const loadPlayersHPState = 
createFeatureSelector<PlayersHPState>('playersHPState');

export const loadMyHP = createSelector(
    loadPlayersHPState,
    (state: PlayersHPState) => state.myHP
);

export const loadEnemyHP = createSelector(
    loadPlayersHPState,
    (state: PlayersHPState) => state.enemyHP
);

export const playersHPQuery = {
    loadPlayersHPState,
    loadMyHP,
    loadEnemyHP
};
