import * as mongoose from 'mongoose';

export interface Skill extends mongoose.Document {
    id: number
    name: string
    description: string
}

export const SKILL_SCHEMA = {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}