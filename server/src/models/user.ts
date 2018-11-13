import * as mongoose from 'mongoose';

export interface UserDB extends mongoose.Document {
    userToken: string;
}

export const USER_SCHEMA = {    
    userToken: {
        type: String,
        required: true
    }
};
