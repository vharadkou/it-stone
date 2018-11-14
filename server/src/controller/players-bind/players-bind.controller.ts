import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { AppTokenRepository } from 'service/app-token/app-token.repository';
import { PlayersBindService } from 'service/player-bind';

@controller('/api')
export class PlayersBindController {
    public constructor (
        @inject(AppTokenRepository) private appTokenRepository: AppTokenRepository,
        @inject(PlayersBindService) private playersBindService: PlayersBindService
    ){ }

    @httpPost('/set-user-bind')
    public async setUserBind(request: Request, response: Response): Promise<void | Response> {
        try {
            const appToken = 'Bearer ' + (await this.appTokenRepository.getAppToken())[0].token;
            
            if (request.headers.authorization === appToken){
                let errorMessage;
                try {                    
                    this.playersBindService.savePlayersBinds(request.body);                    
                } catch (error) {
                    errorMessage = error.message;
                }

                if (errorMessage) {
                    response.status(400).send(errorMessage);
                } else {
                    response.status(200).send();
                }
            } else {
                response.status(401).send('Different token')
            }
        } catch (err) {
            return response.status(400)
                .json('Tech error')
        }
    }
}