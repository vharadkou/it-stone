import * as mongoose from 'mongoose';

export interface Card extends mongoose.Document {
    id: number;
    name: string;
    hp: number;
    superSkill: string;
    ignore: string[];
    damage: number;
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
