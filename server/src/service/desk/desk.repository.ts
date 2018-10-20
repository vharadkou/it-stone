
import { injectable, inject } from 'inversify';
import { Mongoose, Schema, Model } from 'mongoose';

import { Deck, DECK_SCHEMA, Card } from '../../models';

import {
    DB_URL,
    DECK_COLLECTION,
} from '../../constants/db';
import { CardRepository } from '../card';

@injectable()
export class DeskRepository {

    private mongoose: Mongoose = new Mongoose();
    private deckModel: Model<Deck> = this.mongoose.model<Deck>(DECK_COLLECTION, new Schema(DECK_SCHEMA));

    constructor(
        @inject(CardRepository) private cardRepository: CardRepository,
    ) {
        this.mongoose.connect(DB_URL);
    }

    public async createDeck(userEmail: string, cardIds: string[]): Promise<Deck> {
        const newDeck: Deck = new this.deckModel({
            userEmail,
            cardIds,
        });

        return new Promise<Deck>((resolve, reject) => {
            newDeck.save((error, data: Deck) => {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    resolve(data);
                    console.log(`Save ${data._id} deck success`);
                }
            });
        });
    }

    public async updateCard(userEmail: string, cardIds: string[]): Promise<Deck> {
        return new Promise<Deck>((resolve, reject) => {
            this.deckModel.findOneAndUpdate({ userEmail }, cardIds, async (error, data: Deck) => {
                if (error) {
                    reject(error);
                } else {
                    if (!data) {
                        const newDate = await this.createDeck(userEmail, cardIds);
                        resolve(newDate);
                    } else {
                        resolve(data);
                        console.log(`Update ${data.userEmail} image success`);
                    }
                }
            });
        });
    }

    public async getDeckCards(userEmail: string): Promise<Card[]> {
        return new Promise<Card[]>((resolve, reject) => {
            this.deckModel.findOne({ userEmail }, async (error, data: Deck) => {
                if (error) {
                    reject(error);
                } else {
                    const cards = await this.cardRepository.getCards();

                    const deckCards: Card[] = cards.filter((card) => data.cardIds
                        .findIndex((cardId) => cardId === card._id) !== -1);
                    resolve(deckCards);
                    console.log(`Get deck cards`);
                }
            });
        });
    }
}
