
import { Mongoose, Schema, Model } from 'mongoose';
import { injectable, inject } from 'inversify';

import { Card, CARD_SCHEMA } from '../../models/new-card';
import { DB_URL, CARD_COLLECTION } from '../../constants/db';
import { CardRepository } from './Card.repository';
import { LoggerService } from 'service/logger';

@injectable()
export class CardRepositoryImplementation implements CardRepository {

    private mongoose: Mongoose = new Mongoose();
    private cardModel: Model<Card> = this.mongoose.model<Card>(CARD_COLLECTION, new Schema(CARD_SCHEMA));

    public constructor(
        @inject(LoggerService) private loggerService: LoggerService
    ) {
        this.mongoose.connect(DB_URL, { useNewUrlParser: true });
    }

    public saveCard(
        id: number,
        name: string,
        surname: string,
        image: string,
        skills: string[],
        hp: number,
        damage: number
    ): Promise<Card> {
        const newCard: Card = new this.cardModel({
            id,
            name,
            surname,
            image,
            skills,
            hp,
            damage,
        });

        return new Promise<Card>((resolve, reject) => {
            newCard.save((error, data: Card) => {
                if (error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog(`Successful saving card with id=${data.id}`);
                    resolve(data);
                }
            });
        });
    }

    public getCards(): Promise<Card[]> {
        return new Promise<Card[]>((resolve, reject) => {
            this.cardModel.find({}, (error, data: Card[]) => {
                if (error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog('Successful getting cards');
                    resolve(data);
                }
            });
        });
    }

    public deleteCard(
        requestId: number
        ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.cardModel.deleteOne({ id: requestId }, (error) => {
                if (error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog('Successful removing card');
                    resolve(true);
                }
            });
        });
    }

    public updateCard(updatedCard: Card): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.cardModel.updateOne({ id: updatedCard.id }, updatedCard, error => {
                if(error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog('Successful updating card');
                    resolve(true);
                }
            });
        });
    }
}
