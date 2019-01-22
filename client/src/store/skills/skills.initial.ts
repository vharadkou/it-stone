import { Status } from 'models';

import { SkillsState } from './interfaces';

export const skillsInitialState: SkillsState = {
  status: Status.Init,
  skills: [],
  checkedSkills: []
};
