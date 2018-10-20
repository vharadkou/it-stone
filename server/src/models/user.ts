import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
    email: string;
    name: string;
    accessToken: string;
}

export const USER_SCHEMA = {
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    }
};
