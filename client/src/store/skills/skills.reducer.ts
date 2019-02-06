import { Status, Skill } from 'models';

import { SkillsActionTypes, SkillsActions } from './skills.action';
import { skillsInitialState } from './skills.initial';
import { SkillsState } from './interfaces';

export const skillsReducer = (
  state: SkillsState = skillsInitialState,
  action: SkillsActions
): SkillsState => {
  switch (action.type) {
    case SkillsActionTypes.LoadSkills:
      return {
        ...state,
        status: Status.Init
      };

    case SkillsActionTypes.LoadSkillsSuccess:
      return {
        ...state,
        status: Status.Success,
        skills: action.payload,
      };

    case SkillsActionTypes.LoadSkillsError:
      return {
        ...state,
        status: Status.Error
      };

    case SkillsActionTypes.CheckSkills:
      let checkedSkills: Skill[];
      if (action.payload.card) {
        const cardSkills: string[] = action.payload.card.skills;
        checkedSkills = state.skills.filter((skill) => {
          return cardSkills.indexOf(skill.name) !== -1;
        });
      } else {
        checkedSkills = [];
      }
      return {
        ...state,
        checkedSkills
      };

    default:
      return state;
  }
};
