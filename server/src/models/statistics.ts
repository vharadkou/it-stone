import * as mongoose from 'mongoose';

export interface Statistics extends mongoose.Document {
    gamesPlayed: number;
    gamesWon: number;
}

export const STATISTICS_SCHEMA = {
    gamesPlayed: {
        type: Number,
        required: false
    },
    gamesWon: {
        type: Number,
        required: false
    },
};