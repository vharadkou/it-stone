import * as mongoose from 'mongoose';

export interface AppTokenDB extends mongoose.Document {
    token: string
}

export const APPTOKEN_SCHEMA = {
    token: {
        type: String,
        required: true
    }
}