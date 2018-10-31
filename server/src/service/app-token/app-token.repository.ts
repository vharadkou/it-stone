import { Mongoose, Schema, Model } from 'mongoose';
import { APPTOKEN_COLLECTION } from '../../constants/db';
import { APPTOKEN_SCHEMA } from '../../models';
import { DB_URL } from '../../constants/db';
import { AppTokenDB } from '../../models';
import { injectable } from 'inversify';

@injectable()
export class AppTokenRepository {

    private mongoose: Mongoose = new Mongoose();
    private appTokenModel: Model<AppTokenDB> = this.mongoose.model<AppTokenDB>(APPTOKEN_COLLECTION, new Schema(APPTOKEN_SCHEMA));

    constructor () {
        this.mongoose.connect(DB_URL);
    }

    public async saveAppToken(inputString: string): Promise<AppTokenDB> {

        console.log('saveAppToken from repository');       

        const newToken: AppTokenDB = new this.appTokenModel({ token: inputString});        

        return new Promise<AppTokenDB>((resolve,reject) => {
            newToken.save((error: any, data: AppTokenDB) => {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    public async getAppToken(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.appTokenModel.find({}, (error, data: AppTokenDB[]) => {
                if (error) {
                    reject(error);
                } else {
                    const newData: AppTokenDB[] = data.map((item) => item);
                    resolve(newData);
                    console.log(newData);
                    console.log(`Get appToken`);
                }
            });
        });
    }
}
