import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroState } from './interfaces';

const getHeroState = createFeatureSelector<HeroState>('heroState');
const selectHeroes = (state: HeroState) => state.heroes;
// const getSelected = (state: HeroState) => state.selected;
const selectAllHeroes = createSelector(getHeroState, selectHeroes);

export const HeroesQuery = {
    selectAllHeroes
};

