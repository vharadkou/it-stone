import { createSelector, createFeatureSelector } from '@ngrx/store';

import { SkillsState } from './interfaces';

const getSkillsState = createFeatureSelector<SkillsState>('skillsState');

const GetSkills = (state: SkillsState) => state.skills;
const GetCheckedSkills = (state: SkillsState) => state.checkedSkills;

const getSkills = createSelector(
  getSkillsState,
  GetSkills
);

const getCheckedSkills = createSelector(
  getSkillsState,
  GetCheckedSkills
);

export const skillsQuery = {
  getSkills,
  getSkillsState,
  getCheckedSkills
};
