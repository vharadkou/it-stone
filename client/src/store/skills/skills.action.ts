import { Action } from '@ngrx/store';

import { Skill } from 'models';

export enum SkillsActionTypes {
    LoadSkills = '[skills] Load skills',
    LoadSkillsSuccess = '[skills] Load skills (Success)',
    LoadSkillsError = '[skills] Load skills (Error)',
}

export class LoadSkills implements Action {
    public readonly type = SkillsActionTypes.LoadSkills;
}

export class LoadSkillsSuccess implements Action {
    public readonly type = SkillsActionTypes.LoadSkillsSuccess;

    constructor(public payload: Skill[]) { }
}

export class LoadSkillsError implements Action {
    public readonly type = SkillsActionTypes.LoadSkillsError;

    constructor(public payload: Error) { }
}

export type SkillsActions =
    | LoadSkills
    | LoadSkillsSuccess
    | LoadSkillsError;