import { controller, httpPost, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { UserAuthenticationRepository } from 'service/user-authentication';
import { User } from '../models';

@controller('/api/users')
export class UserController {

  constructor(@inject(UserAuthenticationRepository) private userAuthenticationRepository: UserAuthenticationRepository) {
  }

  @httpPost('/google-auth')
  public async googleAuth(request: Request, response: Response): Promise<Response | User> {
    const { email, name, accessToken } = request.body;
    try {
      return this.userAuthenticationRepository.socialNetworksLogin(email, name, accessToken);
    } catch (error) {
      return response.status(500).json(error)
    }
  }
}
