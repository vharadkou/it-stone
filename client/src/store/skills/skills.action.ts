import { Action } from '@ngrx/store';

import { Card, Skill } from 'models';

export enum SkillsActionTypes {
    LoadSkills = '[skills] Load skills',
    LoadSkillsSuccess = '[skills] Load skills (Success)',
    LoadSkillsError = '[skills] Load skills (Error)',
    CheckSkills = '[skills] Check skills'
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

export class CheckSkills implements Action {
    public readonly type = SkillsActionTypes.CheckSkills;

    constructor(public payload: {card?: Card}) {}
}

export type SkillsActions =
    | LoadSkills
    | LoadSkillsSuccess
    | LoadSkillsError
    | CheckSkills;
