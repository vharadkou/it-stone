import { Mongoose, Schema, Model } from 'mongoose';
import { APPTOKEN_COLLECTION } from '../../constants/db';
import { APPTOKEN_SCHEMA } from '../../models';
import { DB_URL } from '../../constants/db';
import { AppTokenDB } from '../../models';
import { injectable, inject } from 'inversify';
import { LoggerService } from 'service/logger';
import { AppTokenRepository } from './app-token.repository';

@injectable()
export class AppTokenRepositoryImplementation implements AppTokenRepository  {

    private mongoose: Mongoose = new Mongoose();
    private appTokenModel: Model<AppTokenDB> = this.mongoose.model<AppTokenDB>(APPTOKEN_COLLECTION, new Schema(APPTOKEN_SCHEMA));

    constructor (
        @inject(LoggerService) private loggerService: LoggerService
    ) {
        this.mongoose.connect(DB_URL);
    }

    public async saveAppToken(inputString: string): Promise<AppTokenDB> {        

        const newToken: AppTokenDB = new this.appTokenModel({ token: inputString});        

        return new Promise<AppTokenDB>((resolve,reject) => {
            newToken.save((error: any, data: AppTokenDB) => {
                if (error) {
                    reject(error);
                    this.loggerService.errorLog(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    public async getAppToken(): Promise<AppTokenDB[]> {
        return new Promise<AppTokenDB[]>((resolve, reject) => {
            this.appTokenModel.find({}, (error, data: AppTokenDB[]) => {
                if (error) {
                    reject(error);
                    this.loggerService.errorLog(error);
                } else {
                    const newData: AppTokenDB[] = data;                    
                    resolve(newData);                    
                    this.loggerService.infoLog(`Getting appToken`);
                }
            });
        });
    }

    public deleteAppToken(appToken: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.appTokenModel.deleteOne({ token: appToken }, (error) => {
                if (error) {
                    reject(error);
                    this.loggerService.errorLog(error);
                } else {
                    resolve(true);
                    this.loggerService.infoLog('Application token has been deleted');
                }
            });
        });
    }    

}
