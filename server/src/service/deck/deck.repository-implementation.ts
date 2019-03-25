
import { injectable, inject } from 'inversify';
import { Mongoose, Schema, Model } from 'mongoose';

import { Deck, DECK_SCHEMA,  } from '../../models/new-deck';
import { Card } from '../../models/new-card';

import { DB_URL, DECK_COLLECTION } from '../../constants/db';
import { DeckRepository } from './deck.repository';
import { CardRepository } from '../card';
import { LoggerService } from 'service/logger';

@injectable()
export class DeckRepositoryImplementation implements DeckRepository {

    private mongoose: Mongoose = new Mongoose();
    private deckModel: Model<Deck> = this.mongoose.model<Deck>(DECK_COLLECTION, new Schema(DECK_SCHEMA));

    constructor(
        @inject(CardRepository) private cardRepository: CardRepository,
        @inject(LoggerService) private loggerService: LoggerService
    ) {
        this.mongoose.connect(DB_URL, { useNewUrlParser: true });
    }

    public async getDeckCardsById(deckID: number): Promise<Card[]> {
        return new Promise<Card[]>((resolve, reject) => {
            this.deckModel.findOne({ id: deckID }, async (error, data: Deck) => {
                if (error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    const allCards: Card[] = await this.cardRepository.getCards();
                    const deckCards: Card[] = allCards.filter(
                        card => data.cardIds.findIndex(cardIdFromDeck => cardIdFromDeck === card.id) !== -1
                    );

                    this.loggerService.infoLog(`Successful getting cards with deck's id=${deckID}`);
                    resolve(deckCards);
                }
            });
        });
    }

    public async getDecks(): Promise<Deck[]> {
        return new Promise<Deck[]>((resolve, reject) => {
            this.deckModel.find({}, (error, data: Deck[]) => {
                if (error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog(`Successful getting decks`);
                    resolve(data);
                }
            });
        });
    }

    public async getDeckById(deckID: number): Promise<Deck> {
        return new Promise<Deck>((resolve, reject) => {
            this.deckModel.findOne({ id: deckID }, (error, data: Deck) => {
                if(error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog(`Successful getting deck with id=${deckID}`);
                    resolve(data);
                }
            });
        });
    }

    public async getDeckByTitle(deckTitle: string): Promise<Deck> {
        return new Promise<Deck>((resolve, reject) => {
            this.deckModel.findOne({ title: deckTitle }, (error, data: Deck) => {
                if(error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog(`Successful getting deck with title=${deckTitle}`);
                    resolve(data);
                }
            });
        });
    }
}
