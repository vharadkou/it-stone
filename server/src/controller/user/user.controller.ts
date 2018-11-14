import { controller, httpPost, httpGet } from "inversify-express-utils";
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { UserService } from "service/user";

@controller('/api/user')
export class UserController {
    public  constructor (
        @inject(UserService) private userService: UserService
    ) { }

    @httpGet('/clean-users-database')
    public async cleanUsersCollection(request: Request, response: Response): Promise<boolean | Response>{
        try {            
            const baseIsClean = await this.userService.cleanUsersCollection();
            
            return baseIsClean
        } catch (err) {
            return response.status(400).json({
                status: 'error',
                message: 'Database don`t cleaned'
            });
        }
    }
}
