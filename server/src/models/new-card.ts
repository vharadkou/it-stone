import * as mongoose from 'mongoose';

export interface Card extends mongoose.Document {
    id: number;
    name: string;
    surname: string;
    image: string;
    skills: string[];
    hp: number;
    damage: number;
}

export const CARD_SCHEMA = {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    skills: {
        type: [String],
        required: true
    },
    hp: {
        type: Number,
        required: true
    },
    damage: {
        type: Number,
        required: true
    }
};
