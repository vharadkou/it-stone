import * as mongoose from 'mongoose';
import { Card, CARD_SCHEMA } from './card';

export interface Deck extends mongoose.Document {
    userEmail: string;
    cardIds: string[];
}

export const DECK_SCHEMA = {
    userEmail: {
        type: String,
        required: true
    },
    cardIds: {
        type: [String],
    },
};
