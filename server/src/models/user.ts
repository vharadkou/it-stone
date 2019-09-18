import * as mongoose from 'mongoose';
import { Deck, DECK_SCHEMA } from './new-deck';
import { Statistics, STATISTICS_SCHEMA } from './statistics';

export interface User extends mongoose.Document {
    userToken: string;
    decks: Deck[];
    statistics: Statistics;
}

export const USER_SCHEMA = {
    userToken: {
        type: String,
        unique: true,
        required: true
    },
    decks: {
        type: [DECK_SCHEMA],
        required: false
    },
    statistics: {
        type: STATISTICS_SCHEMA,
        required: false
    }
};
