import { Action } from '@ngrx/store';

export enum PlayersHPActionTypes {
    GetMyHP = '[playersHP] get my HP',
    GetEnemyHP = '[playersHP] get enemy HP',
    IncreaseMyHP = '[playersHP] Increase my HP',
    DecreaseMyHP = '[playersHP] decrease my HP',
    IncreaseEnemyHP = '[playersHP] Increase enemy HP',
    DecreaseEnemyHP = '[playersHP] decrease enemy HP'
}

export class GetMyHP implements Action {
    public readonly type = PlayersHPActionTypes.GetMyHP;
}

export class EnemyMyHP implements Action {
    public readonly type = PlayersHPActionTypes.GetMyHP;
}

export class GetEnemyHP implements Action {
    public readonly type = PlayersHPActionTypes.GetEnemyHP;
}

export class IncreaseMyHP implements Action {
    public readonly type = PlayersHPActionTypes.IncreaseMyHP;

    constructor(public payload: {heal: number}) {}
}

export class DecreaseMyHP implements Action {
    public readonly type = PlayersHPActionTypes.DecreaseMyHP;

    constructor(public payload: {damage: number}) {}
}

export class IncreaseEnemyHP implements Action {
    public readonly type = PlayersHPActionTypes.IncreaseEnemyHP;

    constructor(public payload: {heal: number}) {}
}

export class DecreaseEnemyHP implements Action {
    public readonly type = PlayersHPActionTypes.DecreaseEnemyHP;

    constructor(public payload: {damage: number}) {}
}

export type PlayersHPActions =
    GetMyHP |
    GetEnemyHP |
    IncreaseMyHP |
    DecreaseMyHP |
    IncreaseEnemyHP |
    DecreaseEnemyHP;
