import { controller, httpGet, httpPost, httpDelete } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { CardService } from 'service/card';

@controller('/api')
export class CardController {
    public constructor(
        @inject(CardService) private cardService: CardService
    ) { }

    @httpGet('/get-cards/')
    public async getSkills(request: Request, response: Response){ 
        try {
            return this.cardService.getCards();
          } catch (error) {
            return response.status(500).json(error);
        }
    }

    @httpPost('/save-card/')
    public async saveCard(request: Request, response: Response){
        const card = request.body;

        try {
            const isSave = await this.cardService.saveCard(card.id, card.name, card.surname, card.image, card.skills, card.hp, card.damage);            
            if (isSave) {                
                response.status(200).send({status: 'Saved'});
            } else {
                response.status(400).send({status: 'Error'});
            }

        } catch (error){
            return response.status(500).json(error);
        }
    }

    @httpDelete('/delete-card/')
    public async deleteCard(request: Request, response: Response): Promise<void | Response>{
        let requestId = request.body.id;
        try {
            this.cardService.deleteCard(requestId);
          } catch (error) {
            return response.status(500).json(error);
        }
    } 
}