import { controller, httpPost } from "inversify-express-utils";
import { inject } from 'inversify';
import { SendResultService } from "service";
import { Request, Response } from 'express';

@controller('/api/send-result')
export class SendResultController {
    public  constructor (
        @inject(SendResultService) private sendResultService: SendResultService
    ) { }

    @httpPost('/finished-game')
    public async sendResultOfFinishedGame(request: Request, response: Response): Promise<void | Response>{
        const userToken: string = request.body.userToken;

        try {
            const isSend = await this.sendResultService.sendResult(userToken);

            if(isSend) {
                return response.status(200).json(userToken);
            }

        } catch (err) {
            return response.status(400).json({
                status: 'error',
                message: 'Error of send result'
            });
        }
    }
}
