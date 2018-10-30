import { RoomRepository } from './room.repository';
import uuid from 'uuid';

export class RoomRepositoryImplementation implements RoomRepository{
    public createRoomToken(): string{        
        const roomToken = uuid();
        /* const roomToken = 'xxx' */

        return roomToken;
    }
}