import * as mongoose from 'mongoose';

export interface Deck extends mongoose.Document {
    id: number;
    title: string;
    cardIds: number[];
}

export const DECK_SCHEMA = {
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cardIds: {
        type: [Number],
        required: false
    }
};
