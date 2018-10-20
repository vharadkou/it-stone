import { controller, httpPost, httpGet, httpPut } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { UserAuthenticationRepository } from 'service/user-authentication';
import { User, Card, Deck } from '../models';
import { CardRepository } from '../service/card';
import { DeskRepository } from 'service';

@controller('/api/users')
export class UserController {

  constructor(
    @inject(UserAuthenticationRepository) private userAuthenticationRepository: UserAuthenticationRepository,
    @inject(CardRepository) private cardRepository: CardRepository,
    @inject(DeskRepository) private deskRepository: DeskRepository,
  ) { }

  @httpPost('/google-auth')
  public async googleAuth(request: Request, response: Response): Promise<Response | User> {
    const { email, name, accessToken } = request.body;
    try {
      return this.userAuthenticationRepository.socialNetworksLogin(email, name, accessToken);
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  @httpPost('/save-card')
  public async saveCard(request: Request, response: Response): Promise<Response | Card> {
    const { name, currentPosition, education, skills, image } = request.body;
    try {
      return this.cardRepository.saveCard(name, currentPosition, education, skills, image);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  @httpGet('/get-cards')
  public async getCards(request: Request, response: Response): Promise<Response | Card[]> {
    try {
      return this.cardRepository.getCards();
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  @httpPut('update-deck')
  public async updateImage(request: Request, response: Response): Promise<Response | Deck> {
    const userEmail = request.body.email;
    const cardIds = request.body.cardIds;

    try {
      return this.deskRepository.updateCard(userEmail, cardIds)
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  @httpGet('/get-deck-cards/:userEmail')
  public async getDeckCards(request: Request, response: Response): Promise<Response | Card[]> {
    const userEmail = request.params.userEmail;

    try {
      return this.deskRepository.getDeckCards(userEmail);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
