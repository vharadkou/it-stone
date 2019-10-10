import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayersInfoState } from './interfaces';


const getPlayersInfoState = createFeatureSelector<PlayersInfoState>('playersInfoState');
const GetPlayersInfo = (state: PlayersInfoState) => state.player;

const getPlayersInfo = createSelector(
    getPlayersInfoState,
    GetPlayersInfo
)
export const playersInfoQuery = {
    getPlayersInfo
}
 