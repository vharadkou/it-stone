import { inject, injectable } from 'inversify';

import { PlayersBind } from '../../model';
import { RoomService } from 'service/room';
import { PlayerBindRepository } from './player-bind.repository';
import { UserService } from 'service/user';
import { LoggerService } from 'service/logger';

@injectable()
export class PlayersBindService {
    
    constructor(
        @inject(PlayerBindRepository) private playerBindRepository: PlayerBindRepository,
        @inject(RoomService) private roomService: RoomService,
        @inject(UserService) private userService: UserService,
        @inject(LoggerService) private loggerService: LoggerService
    ) { }

    public savePlayersBinds(playersBind: PlayersBind): void{
        if(this.checkPlayersBind(playersBind)){
            this.playerBindRepository.savePlayersBind(playersBind);
            this.roomService.addRoom(playersBind);
        }
    }

    public checkPlayersBind(playersBind: PlayersBind): boolean {
        
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
            this.userService.addUserToDb(playersBind.players[0]);
            this.userService.addUserToDb(playersBind.players[1]);
            this.loggerService.infoLog('Room and players have been binded');

            return true
        }
    }
}
