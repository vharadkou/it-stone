import { injectable } from 'inversify';

import { PlayersBind } from 'models';
import { PlayerBindRepository } from './player-bind.repository';

const playersBinds: PlayersBind[] = [];

@injectable()
export class PlayersBindRepositoryImplementation implements PlayerBindRepository{
    public savePlayersBind(playersBind: PlayersBind): void{
        playersBinds.push(playersBind);
    }
}