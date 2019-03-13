import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AboutPageState } from './interfaces';

const getAboutCardState = createFeatureSelector<AboutPageState>('aboutPageState');

const GetAboutCards = (state: AboutPageState) => state.developers;

const getAboutCards = createSelector(
  getAboutCardState,
  GetAboutCards
);


export const aboutCardsQuery = {
  getAboutCards,
};
