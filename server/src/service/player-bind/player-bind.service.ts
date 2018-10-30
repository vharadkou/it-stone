import { inject, injectable } from 'inversify';

import { AppTokenRepository } from 'service/app-token';
import { PlayersBind } from '../../model';

@injectable()
export class PlayersBindService {
    private playersBinds: PlayersBind[] = [];

    constructor(
        @inject(AppTokenRepository) private tokenRepository: AppTokenRepository

    )
    { }

    public getPlayersBinds(): PlayersBind[]{
        return this.playersBinds
    }

    public getPlayersBindByRoom(room: string): PlayersBind{
        return this.playersBinds.find((playersBind: PlayersBind) => playersBind.room === room)
    }

    public bindPlayer(room:string, bindPlayer: string): void{
        const playersBindIndex = this.playersBinds.findIndex((playersBind: PlayersBind) => playersBind.room === room);

        if(playersBindIndex === -1){
            this.playersBinds.push({room, players: [bindPlayer]})
        } else {
            this.playersBinds[playersBindIndex].players.push(bindPlayer);
        }
    }
    
    public removePlayers(room: string, removePlayer: string): void{
        const playersBindIndex = this.playersBinds
        .findIndex((playersBind: PlayersBind) => playersBind.room === room);

        this.playersBinds[playersBindIndex].players = this.playersBinds[playersBindIndex].players
            .filter((player) => player !== removePlayer)
    }

    public async
}