
import { injectable } from 'inversify';
import { Mongoose, Schema, Model } from 'mongoose';

import { Card, CARD_SCHEMA } from '../../models';

import {
    DB_URL,
    CARD_COLLECTION,
} from '../../constants/db';

@injectable()
export class CardRepository {

    private mongoose: Mongoose = new Mongoose();
    private cardModel: Model<Card> = this.mongoose.model<Card>(CARD_COLLECTION, new Schema(CARD_SCHEMA));

    constructor() {
        this.mongoose.connect(DB_URL);
    }

    public async saveCard(
        name: string,
        currentPosition: string,
        education: number,
        skills: string[],
        image: string,
    ): Promise<Card> {
        const newCard: Card = new this.cardModel({
            name,
            currentPosition,
            education,
            skills,
            image
        });

        return new Promise<Card>((resolve, reject) => {
            newCard.save((error, data: Card) => {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    resolve(data);
                    console.log(`Save ${data._id} card success`);
                }
            });
        });
    }

    public async getCards(): Promise<Card[]> {
        return new Promise<Card[]>((resolve, reject) => {
            this.cardModel.find({}, (error, data: Card[]) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                    console.log(`Get all cards`);
                }
            });
        });
    }
}
