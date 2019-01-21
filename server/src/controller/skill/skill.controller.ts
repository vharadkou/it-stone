import { controller, httpGet, httpPost, httpDelete } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { SkillService } from 'service/skill';

@controller('/api')
export class SkillController{

    public constructor(
        @inject(SkillService) private skillService: SkillService) {
    }

    @httpPost('/save-skill/')
    public async saveSkill(request: Request, response: Response){
        const skill = request.body;

        try {
            const isSave = await this.skillService.saveSkill(skill.id, skill.name, skill.description);            
            if (isSave) {                
                response.status(200).send({status: 'Saved'});
            } else {
                response.status(400).send({status: 'Error'});
            }

        } catch (error){
            return response.status(500).json(error);
        }
    }

    @httpGet('/get-skills/')
    public async getSkills(request: Request, response: Response){ 
        try {
            return this.skillService.getSkills();
          } catch (error) {
            return response.status(500).json(error);
        }
    }

    @httpDelete('/delete-skill/')
    public async deleteSkill(request: Request, response: Response): Promise<void | Response>{
        let requestName = request.body.name
        try {
            this.skillService.deleteSkill(requestName);
          } catch (error) {
            return response.status(500).json(error);
        }
    } 

}