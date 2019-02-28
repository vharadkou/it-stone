import { controller, httpGet, httpPost, httpDelete } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { CardRepository } from './../../service/card/card.repository';

@controller('/api')
export class CardController {
    public constructor(
        @inject(CardRepository) private cardRepository: CardRepository
    ) { }

    @httpGet('/get-cards/')
    public async getSkills(request: Request, response: Response){ 
        try {
            return await this.cardRepository.getCards();
          } catch (error) {
            return response.status(500).json(error);
        }
    }

    @httpPost('/save-card/')
    public async saveCard(request: Request, response: Response){
        const card = request.body;

        try {
            await this.cardRepository.saveCard(card.id, card.name, card.surname, card.image, card.skills, card.hp, card.damage);

            if (response.statusCode == 200) {    
                response.status(200).send({status: 'Successful'});            
            }

        } catch (error){
            return response.status(500).json(error);
        }
    }

    @httpDelete('/delete-card/')
    public async deleteCard(request: Request, response: Response): Promise<void | Response>{
        const requestId = request.body.id;
        try {
            await this.cardRepository.deleteCard(requestId);

            if (response.statusCode == 200) {    
                response.status(200).send({status: 'Successful'});            
            }

          } catch (error) {
            return response.status(500).json(error);
        }
    } 
}