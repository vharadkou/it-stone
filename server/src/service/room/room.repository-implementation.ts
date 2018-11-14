import { RoomRepository } from './room.repository';
import uuid from 'uuid';
import { injectable } from 'inversify';

@injectable()
export class RoomRepositoryImplementation implements RoomRepository{
    public createRoomToken(): string{        
        const roomToken = uuid();        

        return roomToken;
    }
}
