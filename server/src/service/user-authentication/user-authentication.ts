import { injectable } from 'inversify';
import { Mongoose, Schema, Model } from 'mongoose';

import { USER_SCHEMA, User } from '../../models';
import {
    DB_URL,
    USER_COLLECTION,
} from '../../constants/db';

@injectable()
export class UserAuthenticationRepository {

    private mongoose: Mongoose = new Mongoose();
    private userModel: Model<User> = this.mongoose.model<User>(USER_COLLECTION, new Schema(USER_SCHEMA));

    constructor() {
        this.mongoose.connect(DB_URL);
    }

    public async socialNetworksLogin(
        email: string,
        name: string,
        accessToken: string,
    ): Promise<User> {
        const newUser: User = new this.userModel({ email, name, accessToken });

        return new Promise<User>((resolve, reject) => {
            newUser.save((error, data: User) => {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    resolve(data);
                    console.log(`Save ${data._id} user success`);
                }
            });
        });
    }
}
