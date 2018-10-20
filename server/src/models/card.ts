import * as mongoose from 'mongoose';

export interface Card extends mongoose.Document {
    name: string;
    hp: number;
    superSkill: string;
    ignore: string[];
    createAttack: Array<{ [name: string]: string }>;
    image: string;
}

export const CARD_SCHEMA = {
    name: {
        type: String,
        required: true
    },
    hp: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    superSkill: {
        type: String,
        required: true
    },
    ignore: {
        type: [String],
    },
    createAttack: {
        type: [String],
    },
};
