import { Status, Skill } from 'models';

export interface SkillsState {
  status: Status;
  skills: Skill[];
  checkedSkills: Skill[];
}