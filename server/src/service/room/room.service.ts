import { injectable, inject } from "inversify";

import { 
    Room, 
    PlayersBind, 
    ParticipationStatus, 
    ResultStatus, 
    RoomStatus 
} from '../../model'

import { RoomRepository } from './room.repository'

const rooms: Room[] =[]

@injectable()
export class RoomService {
    constructor(
        @inject(RoomRepository) private roomRepository: RoomRepository
    ) { }

    public  createToken(): string {
        return this.roomRepository.createRoomToken()
    }

    public addRoom(playersBind: PlayersBind): void{
        const players = playersBind.players.map((playerToken) => ({
            playerToken,
            playerSocket: null,
            participationStatus: ParticipationStatus.INIT,
            resultStatus: ResultStatus.INIT
        }));

        rooms.push({
            roomToken: playersBind.room,
            players,
            status: RoomStatus.INIT
        });
    }
}
