import { injectable, inject } from "inversify";
import { UserRepository } from './user.repository'
import { UserDB } from '../../models/user';
import { Mongoose, Schema, Model } from 'mongoose';
import { USER_COLLECTION, DB_URL } from '../../constants/db';
import { USER_SCHEMA } from '../../models';
import { LoggerService } from "service/logger";

@injectable()
export class UserRepositoryImplementation implements UserRepository {

    private mongoose: Mongoose = new Mongoose();
    private userModel: Model<UserDB> = this.mongoose.model<UserDB>(USER_COLLECTION, new Schema(USER_SCHEMA));

    constructor (
        @inject(LoggerService) private loggerService: LoggerService
    ) {
        this.mongoose.connect(DB_URL);
    }
    
    public async addUserToDb(userTokenString: string): Promise<UserDB>{
        const newUser: UserDB = new this.userModel({userToken: userTokenString})

        return new Promise<UserDB>((resolve, reject) => {
            newUser.save((error: string, data: UserDB) => {
                if(error){
                    reject(error);
                    this.loggerService.errorLog(error);
                } else {
                    resolve(data)
                }
            })
        })
    }

    public async getUser(userToken: string): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.userModel.find({}, (error, data: UserDB[]) => {
                if(error){
                    reject(error);
                } else {
                    const newData: UserDB[] = data.map((item) => item);
                    resolve(newData);
                    this.loggerService.infoLog(`Get user`);
                }
            });
        });

    }

}
