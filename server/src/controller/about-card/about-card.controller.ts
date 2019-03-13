import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { AboutCardRepository } from '../../service/about-card/about-card.repository';
import { AboutCard } from '../../models/about-card';

@controller('/api')
export class AboutCardController {
    public constructor(
        @inject(AboutCardRepository) private aboutCardRepository: AboutCardRepository
    ) { }

    @httpGet('/get-about-cards/')
    public async getAboutCards(request: Request, response: Response): Promise<AboutCard[] | Response>{ 
        try {
            return this.aboutCardRepository.getAboutCards();
          } catch (error) {
            response.json(error);
        }
    }
}