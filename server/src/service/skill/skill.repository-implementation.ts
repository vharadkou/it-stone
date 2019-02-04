import { Mongoose, Schema, Model } from 'mongoose';
import { SKILL_COLLECTION } from '../../constants/db';
import { SKILL_SCHEMA } from '../../models';
import { DB_URL } from '../../constants/db';
import { Skill } from '../../models';
import { injectable, inject } from 'inversify';
import { LoggerService } from 'service/logger';
import { SkillRepository } from './skill.repository';

@injectable()
export class SkillRepositoryImplementation implements SkillRepository  {

    private mongoose: Mongoose = new Mongoose();
    private skillModel: Model<Skill> = this.mongoose.model<Skill>(SKILL_COLLECTION, new Schema(SKILL_SCHEMA));

    constructor (
        @inject(LoggerService) private loggerService: LoggerService
    ) {
        this.mongoose.connect(DB_URL);
    }

    public async getSkills(): Promise<Skill[]> {
        return new Promise<Skill[]>((resolve, reject) => {
            this.skillModel.find({}, (error, data: Skill[]) => {
                if (error) {
                    reject(error);
                    this.loggerService.errorLog(error);
                } else {
                    const newData: Skill[] = data;                    
                    resolve(newData);                    
                    this.loggerService.infoLog(`Getting skills`);
                }
            });
        });
    }

    public async saveSkill(
        id: number,
        name: string,
        description: string
    ): Promise<Skill> {
        const newSkill: Skill = new this.skillModel({
            id,
            name,
            description
        });

        return new Promise<Skill>((resolve, reject) => {
            newSkill.save((error, data: Skill) => {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    resolve(data);
                    console.log(`Save ${data.name} skill success`);
                }
            });
        });
    }

    public deleteSkill(
        requestName: string
        ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.skillModel.deleteOne({ name: requestName }, (error) => {
                if (error) {
                    reject(error);
                    this.loggerService.errorLog(error);
                } else {
                    resolve(true);
                    this.loggerService.infoLog('Skill has been deleted');
                }
            });
        });
    }

}
