
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
        hp: number,
        superSkill: string,
        ignore: string[],
        createAttack: Array<{ [name: string]: string }>,
        image: string,
    ): Promise<Card> {
        const createAttackJSON = JSON.stringify(createAttack);
        const newCard: Card = new this.cardModel({
            name,
            image,
            hp,
            superSkill,
            ignore,
            createAttack: createAttackJSON,
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
                    const newDate = data
                        .map((d) => ({ ...d, createAttack: JSON.parse(d.createAttack as any) }));
                    resolve(newDate as any);
                    console.log(`Get all cards`);
                }
            });
        });
    }
}
