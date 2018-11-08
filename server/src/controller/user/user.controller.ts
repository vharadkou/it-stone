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
            console.log('Fuck you');
            const isClean = await this.userService.cleanUsersCollection();
            console.log('Fuck you2');

            return isClean
        } catch (err) {
            return response.status(400).json({
                status: 'error',
                message: 'Database dont cleaned'
            });
        }
    }
}
