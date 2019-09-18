
import { Mongoose, Schema, Model } from 'mongoose';
import { injectable, inject } from 'inversify';

import { AboutCard, ABOUT_CARD_SCHEMA } from '../../models/about-card';
import { DB_URL, ABOUT_CARD_COLLECTION } from '../../constants/db';
import { AboutCardRepository } from './about-card.repository';
import { LoggerService } from 'service/logger';

@injectable()
export class AboutCardRepositoryImplementation implements AboutCardRepository {

    private mongoose: Mongoose = new Mongoose();
    private aboutCardModel: Model<AboutCard> = this.mongoose.model<AboutCard>(ABOUT_CARD_COLLECTION, new Schema(ABOUT_CARD_SCHEMA));

    public constructor(
        @inject(LoggerService) private loggerService: LoggerService
    ) {
        this.mongoose.connect(DB_URL, { useNewUrlParser: true });
    }

    public getAboutCards(): Promise<AboutCard[]> {
        return new Promise<AboutCard[]>((resolve, reject) => {
            this.aboutCardModel.find({}, (error, data: AboutCard[]) => {
                if (error) {
                    this.loggerService.errorLog(error);
                    reject(error);
                } else {
                    this.loggerService.infoLog('Successful getting cards');
                    resolve(data);
                }
            });
        });
    }
}
