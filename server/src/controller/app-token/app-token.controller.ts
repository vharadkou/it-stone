import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { AppTokenRepository } from 'service/app-token';

@controller('/api')
export class AppTokenController{

    public constructor(
        @inject(AppTokenRepository) private appTokenRepository: AppTokenRepository) {
    }

    @httpPost('/save-app-token/')
    public async saveAppToken(request: Request, response: Response){
        
        const appToken = request.body.token;
        
        try {
            const isSave = await this.appTokenRepository.saveAppToken(appToken);            
            if (isSave) {                
                response.status(200).send({status: 'Saved'});
            } else {
                response.status(400).send({status: 'Error'});
            }

        } catch (err){
            console.log(err)
        }
    }

    @httpGet('/get-app-token/')
    public async getAppToken(request: Request, response: Response){        
        try {
            return this.appTokenRepository.getAppToken();
          } catch (error) {
            return response.status(500).json(error);
        }
    }

    @httpPost('/delete-app-token/')
    public async deleteAppToken(request: Request, response: Response): Promise<void | Response>{
        let appToken = request.body.token
        try {
            this.appTokenRepository.deleteAppToken(appToken);
          } catch (error) {
            return response.status(500).json(error);
        }
    } 

}