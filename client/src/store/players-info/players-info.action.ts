import { Action } from '@ngrx/store';
import { Player } from 'models';

export enum PlayersInfoActionType {
    LoadPlayerInfo = "[PlayersInfo] load info about player",
    LoadPlayerInfoError = "[PlayersInfo] load info about player (error)",
    LoadPlayerInfoSuccess = "[PlayersInfo] load info about player (success)",
}

export class LoadPlayerInfo implements Action {
    public readonly type = PlayersInfoActionType.LoadPlayerInfo;
}

export class LoadPlayerInfoError implements Action {
    public readonly type = PlayersInfoActionType.LoadPlayerInfoError;

    constructor (public payload: Error) {}
}

export class LoadPlayerInfoSuccess implements Action {
    public readonly type = PlayersInfoActionType.LoadPlayerInfoSuccess;

    constructor (public payload: Player[]) {}
}

export type PlayersInfoActions = 
LoadPlayerInfo | LoadPlayerInfoError | LoadPlayerInfoSuccess; 