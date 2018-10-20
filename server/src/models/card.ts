import * as mongoose from 'mongoose';

export interface Card extends mongoose.Document {
    name: string;
    currentPosition: string;
    education: number;
    skills: string[];
    image: string;
}

export const CARD_SCHEMA = {
    name: {
        type: String,
        required: true
    },
    currentPosition: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    education: {
        type: Number,
        required: true
    },
    skills: {
        type: [String],
    },
};
