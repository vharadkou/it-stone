import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';

import { inject } from 'inversify';

import { AppTokenRepository } from 'service/app-token/app-token.repository';
import { RoomService } from 'service/room/room.service';

@controller('/api')
export class RoomController {
    public constructor (
        @inject(AppTokenRepository) private appTokenService: AppTokenRepository,
        @inject(RoomService) private roomService: RoomService,
    ) { }

    @httpPost('/start-new-room')
    public async startNewRoom(request: Request, response: Response): Promise<void | Response>{
        
        try {
                        
            const appToken = 'Bearer ' + (await this.appTokenService.getAppToken())[0].token;            

            if(request.headers.authorization === appToken){
                const roomToken = this.roomService.createToken();
                response.status(200).send(roomToken);
            } else {                
                response.status(401).send('error message')
            }

        } catch (err) {
            return response.status(400)
                .json('error message')
        }
    }
}
