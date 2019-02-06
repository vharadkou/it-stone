import { Skill } from '../../models';

export abstract class SkillRepository {
    abstract getSkills(): Promise<Skill[]>
    abstract deleteSkill(name: string): Promise<boolean>;
    abstract saveSkill(
        id: number,
        name: string,
        description: string
    ): Promise<Skill>
}