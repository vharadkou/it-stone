import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PlayersHPState } from './interfaces';

export const getPlayersHPState = createFeatureSelector<PlayersHPState>('playersHP');

export const GetMyHp = (state: PlayersHPState) => state.myHp;
export const GetEnemyHp = (state: PlayersHPState) => state.enemyHp;

export const getMyHp = createSelector(
    getPlayersHPState,
    GetMyHp
);

export const getEnemyHp = createSelector(
    getPlayersHPState,
    GetEnemyHp
);

export const playersHPQuery = {
    getPlayersHPState,
    GetMyHp,
    GetEnemyHp
};
