import { PlayersHPState } from './interfaces';
import { PlayersHPActions, PlayersHPActionTypes } from './players-hp.action';
import { playersHPinitialState } from './players-hp.initial';

export const playersHPReducer = (
    state: PlayersHPState = playersHPinitialState,
    action: PlayersHPActions
    ): PlayersHPState => {
    switch (action.type) {
        case PlayersHPActionTypes.LoadPlayersHP:
            return {
                myHP: action.payload.myHP,
                enemyHP: action.payload.enemyHP,
            };

        case PlayersHPActionTypes.IncreaseMyHP:
            return {
                ...state,
                myHP: state.myHP + action.payload.heal
            };

        case PlayersHPActionTypes.DecreaseMyHP:
            return {
                ...state,
                myHP: state.myHP - action.payload.damage
            };

        case PlayersHPActionTypes.IncreaseEnemyHP:
            return {
                ...state,
                enemyHP: state.enemyHP + action.payload.heal
            };

        case PlayersHPActionTypes.DecreaseEnemyHP:
            return {
                ...state,
                enemyHP: state.enemyHP - action.payload.damage
            };

        default: return state;
    }
};
