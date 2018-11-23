import { Action } from '@ngrx/store';

export enum PlayersHPActionTypes {
    GetPlayersHP = '[playersHP] get players HP',
    IncreaseMyHP = '[playersHP] Increase my HP',
    DecreaseMyHP = '[playersHP] decrease my HP',
    IncreaseEnemyHP = '[playersHP] Increase enemy HP',
    DecreaseEnemyHP = '[playersHP] decrease enemy HP'
}

export class GetPlayersHP implements Action {
    public readonly type = PlayersHPActionTypes.GetPlayersHP;

    constructor(public payload: {
        myHP: number,
        enemyHP: number
    })
    {}
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
    GetPlayersHP |
    IncreaseMyHP |
    DecreaseMyHP |
    IncreaseEnemyHP |
    DecreaseEnemyHP;
