import { Status } from 'models';

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

    default:
      return state;
  }
};
