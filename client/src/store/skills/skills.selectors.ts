import { createSelector, createFeatureSelector } from '@ngrx/store';

import { SkillsState } from './interfaces';

const getSkillsState = createFeatureSelector<SkillsState>('skillsState');

const GetSkills = (state: SkillsState) => state.skills;

const getSkills = createSelector(
  getSkillsState,
  GetSkills
);

export const skillsQuery = {
  getSkills,
  getSkillsState
};
