import { inject, injectable } from 'inversify';

import { Card } from '../../models/new-card';
import { CardRepository } from './card.repository';
import { LoggerService } from '../logger';

@injectable()
export class CardService {
    public constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(CardRepository) private cardRepository: CardRepository
    ) { }

    public async getCards(): Promise<Card[]> {
        try {
            return await this.cardRepository.getCards();
        } catch (error) {
            this.loggerService.errorLog('[Card Service] Card was not received');
            throw new Error(error);
        }
    }

    public async saveCard(
        id: number,
        name: string,
        surname: string,
        image: string,
        skills: string[],
        hp: number,
        damage: number
    ): Promise<Card> {
        try {
            return await this.cardRepository.saveCard(id, name, surname, image, skills, hp, damage);
        } catch (error) {
            this.loggerService.errorLog('[Card Service] Card was not saved');
            throw new Error(error);
        }
    }

    public async deleteCard(requestId: number): Promise<boolean> {
        try {
            return await this.cardRepository.deleteCard(requestId);
        } catch (error) {
            this.loggerService.errorLog('[Card Service] Card was not deleted');
            throw new Error(error);
        }
    }
}