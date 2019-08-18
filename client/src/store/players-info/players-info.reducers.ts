import { PlayersInfoState } from './interfaces';
import { PlayersInfoActions, PlayersInfoActionType } from './players-info.action';
import { playersInfoInitialState } from './players-info.initial';
import { Status } from 'models';

export const playersInfoReducer = (state: PlayersInfoState = playersInfoInitialState,
    action: PlayersInfoActions): PlayersInfoState => {
    switch (action.type) {
        case PlayersInfoActionType.LoadPlayerInfo:
            return {
                ...state,
            };
        case PlayersInfoActionType.LoadPlayerInfoError:
            return {
                ...state,
                status: Status.Error
            };

        case PlayersInfoActionType.LoadPlayerInfoSuccess:
            return {
                ...state,
                status: Status.Success,
                player: action.payload
            };
        default:
            return state;
    }
}; 