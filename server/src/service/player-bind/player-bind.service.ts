import { inject, injectable } from 'inversify';

import { PlayersBind } from 'models';
import { RoomService } from 'service/room';
import { PlayerBindRepository } from './player-bind.repository';
import { UserRepository } from 'service/user';
import { LoggerService } from 'service/logger';

@injectable()
export class PlayersBindService {
    
    constructor(
        @inject(PlayerBindRepository) private playerBindRepository: PlayerBindRepository,
        @inject(RoomService) private roomService: RoomService,
        @inject(UserRepository) private userRepository: UserRepository,
        @inject(LoggerService) private loggerService: LoggerService
    ) { }

    public savePlayersBinds(playersBind: PlayersBind): void{
        if(this.checkPlayersBind(playersBind)){
            this.playerBindRepository.savePlayersBind(playersBind);
            this.roomService.addRoom(playersBind);
        }
    }

    public async checkPlayersBind(playersBind: PlayersBind): Promise<boolean | void> {
        
        if(!playersBind.room){
            const error = 'no room';

            this.loggerService.errorLog(error);
            throw new Error(error);
        } else if (!playersBind.players){
            const error = 'no players';

            this.loggerService.errorLog(error);
            throw new Error(error);
        } else if (playersBind.players.length <= 1) {
            const error = 'not enough players';

            this.loggerService.errorLog(error);
            throw new Error(error);
        } else {
            await this.userRepository.addUser(playersBind.players[0]);
            await this.userRepository.addUser(playersBind.players[1]);
            this.loggerService.infoLog('Room and players have been bound');

            return true;
        }
    }
}
