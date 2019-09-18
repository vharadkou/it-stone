import { injectable, inject } from "inversify";
import { UserRepository } from './user.repository'
import { User, USER_SCHEMA } from '../../models';
import { Mongoose, Schema, Model } from 'mongoose';
import { USER_COLLECTION, DB_URL } from '../../constants/db';
import { LoggerService } from "service/logger";

@injectable()
export class UserRepositoryImplementation implements UserRepository {

    private mongoose: Mongoose = new Mongoose();
    private userModel: Model<User> = this.mongoose.model<User>(USER_COLLECTION, new Schema(USER_SCHEMA));

    constructor(
        @inject(LoggerService) private loggerService: LoggerService
    ) {
        this.mongoose.connect(DB_URL, { useNewUrlParser: true });
    }

    public async addUser(token: string): Promise<User> {
        const newUser: User = new this.userModel({userToken: token});
        const allUsers = await this.getAllUsers();

        if (allUsers.map(user => user.userToken).indexOf(token) !== -1) {
            this.loggerService.infoLog('User already exist in database');
        } else {
            return new Promise<User>((resolve, reject) => {
                newUser.save((error, data: User) => {
                    if(error){
                        this.loggerService.errorLog(error);
                        reject(error);
                    } else {
                        this.loggerService.infoLog(`Successful adding user to collection with token=${token}`);
                        resolve(data)
                    }
                });
            });
        }
    }

    public async getUserByToken(token: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.userModel.find({userToken: token}, (error, data: User) => {
                if(error){
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog(`Successful getting user with token=${token}`);
                    resolve(data);
                }
            });
        });
    }

    public async getAllUsers(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            this.userModel.find({}, (error, data: User[]) => {
                if(error){
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog(`Successful getting all users from collection`);
                    resolve(data);
                }
            });
        });
    }

    public async cleanUsersCollection(): Promise<boolean> {
        return new Promise<boolean> ((resolve, reject) => {
            this.userModel.remove({}, (error) => {
                if (error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog('Users collection in database has been cleaned');
                    resolve(true);
                }
            });
        });
    }

    public updateUser(updatedUser: User): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.userModel.updateOne({ userToken: updatedUser.userToken }, updatedUser, error => {
                if(error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog(`Successful updating user with token=${updatedUser.userToken}`);
                    resolve(true);
                }
            });
        });
    }

    public async removeUser(token: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.userModel.deleteOne({userToken: token}, (error) => {
                if(error){
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog(`Successful removing user with token=${token}`);
                    resolve(true);
                }
            });
        });
    }
}
