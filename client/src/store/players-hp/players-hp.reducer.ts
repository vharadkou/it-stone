import { PlayersHPState } from  "./interfaces";
import { PlayersHPActions, PlayersHPActionTypes } from "./players-hp.action";
import { initialState } from "./players-hp.initial";

export const playersHPreducer = (
    action: PlayersHPActions,
    state: PlayersHPState = initialState
    ): PlayersHPState => {
    switch (action.type) {
        case PlayersHPActionTypes.IncreaseMyHP:
            return {
                ...state,
                myHp: state.myHp + action.payload.heal
            };

        case PlayersHPActionTypes.DecreaseMyHP:
            return {
                ...state,
                myHp: state.myHp - action.payload.damage
            };

        case PlayersHPActionTypes.IncreaseEnemyHP:
            return {
                ...state,
                enemyHp: state.enemyHp + action.payload.heal
            };

        case PlayersHPActionTypes.DecreaseEnemyHP:
            return {
                ...state,
                enemyHp: state.enemyHp - action.payload.damage
            };

        default: return state;
    }
};
