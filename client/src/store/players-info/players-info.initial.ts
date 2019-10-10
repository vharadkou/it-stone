import { PlayersInfoState } from './interfaces';
import { Status } from 'models';

export const playersInfoInitialState: PlayersInfoState = {
    player: [
        {
            firstName: 'Player',
            lastName: '1',
            health: 10
        }
    ],
    status: 2
}; 