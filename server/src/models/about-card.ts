import * as mongoose from 'mongoose';

export interface AboutCard extends mongoose.Document {
    title: string;
    name: string;
    surname: string;
    imageSrc: string;
    skills: string[];
    email: string;
}

export const ABOUT_CARD_SCHEMA = {
    title: {
        type: String,
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
    imageSrc: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true
    },
};
