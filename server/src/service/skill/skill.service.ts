import { inject, injectable } from 'inversify';
import { SkillRepository } from './skill.repository';
import { LoggerService } from '../logger';
import { Skill } from '../../models';

@injectable()
export class SkillService {

    public constructor(
        @inject(SkillRepository) private skillRepository: SkillRepository,
        @inject(LoggerService) private loggerService: LoggerService
    ) { }

    public async getSkills(): Promise<Skill[]>{
        try {
            const skills = await this.skillRepository.getSkills()

            return skills
        } catch {
            const error = 'Can`t get skills';
            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async saveSkill(
        id: number,
        name: string,
        description: string
        ): Promise<Skill>{
        try {            
            const skill = await this.skillRepository.saveSkill(id, name, description);

            return skill
        } catch {
            const error = 'Skill wasn`t saved';
            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async deleteSkill(requestName: string): Promise<boolean>{
        try {
            const isDeleted = await this.skillRepository.deleteSkill(requestName);

            return isDeleted
        } catch {
            const error = 'Skill wasn`t deleted';
            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}