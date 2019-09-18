import { controller, httpGet, httpPost, httpDelete, httpPut } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { CardRepository } from './../../service/card/card.repository';
import { Card } from '../../models/new-card';

@controller('/api')
export class CardController {
    public constructor(
        @inject(CardRepository) private cardRepository: CardRepository
    ) { }

    @httpGet('/get-cards/')
    public async getSkills(request: Request, response: Response): Promise<Card[] | Response>{ 
        try {
            return this.cardRepository.getCards();
          } catch (error) {
            response.json(error);
        }
    }

    @httpPost('/save-card/')
    public async saveCard(request: Request, response: Response):Promise<void | Response>{
        const card = request.body;

        try {
            await this.cardRepository.saveCard(card.id, card.name, card.surname, card.image, card.skills, card.hp, card.damage);
  
            response.send({status: 'Successful'});            

        } catch (error){
            response.json(error);
        }
    }

    @httpDelete('/delete-card/')
    public async deleteCard(request: Request, response: Response): Promise<void | Response>{
        const requestId = request.body.id;
        try {
            await this.cardRepository.deleteCard(requestId);

            response.send({status: 'Successful'});            

          } catch (error) {
            response.json(error);
        }
    }
    
    @httpPut('/update-card/')
    public async updateCard(request: Request, response: Response): Promise<void | Response>{
        const updatedCard = request.body;
        try {
            await this.cardRepository.updateCard(updatedCard);

            response.send({status: 'Successful'});
            
        } catch (error) {
            response.json(error);
        }
    }
}