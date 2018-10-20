import { controller, httpPost, httpGet, httpPut } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { UserAuthenticationRepository } from 'service/user-authentication';
import { User, Card, Deck } from '../models';
import { CardRepository } from '../service/card';
import { DeskRepository, ParserService } from 'service';
import { LinkedinInfoParserService } from 'service/linkedinInfoParser';

const data = {
  name: 'Nikita Bazhkou',
  currentPosition: '.Net Software Engineer - EPAM Systems',
  skills: [
      'C#',
      'JavaScript',
      'SQL',
      'Microsoft SQL Server',
      'Cascading Style Sheets (CSS)',
      'ASP.NET Core',
      'ASP.NET MVC 5',
      'Entity Framework',
      'LINQ',
      'ADO.NET',
      'jQuery',
      'React.js',
      'Angular',
      'git',
      'AJAX',
      'JIRA',
      'Solr',
      'EPiServer CMS',
      'EPiServer Commerce'
  ],
  education: 5,
  // tslint:disable-next-line:max-line-length
  image: 'https://media.licdn.com/dms/image/C4E03AQHQPp3axkhdSA/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=NkQL-yaMMRa4WzI22Ks9xrmeTLekzYAjYnhGWD1Nc1Y',
  connections: 50
};

@controller('/api/users')
export class UserController {

  constructor(
    @inject(UserAuthenticationRepository) private userAuthenticationRepository: UserAuthenticationRepository,
    @inject(CardRepository) private cardRepository: CardRepository,
    @inject(DeskRepository) private deskRepository: DeskRepository,
    @inject(LinkedinInfoParserService) private linkedinInfoParserService: LinkedinInfoParserService,
    @inject(ParserService) private parserService: ParserService,
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

  @httpPut('/update-deck')
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

  @httpGet('/test-parser')
  public async TestParser(request: Request, response: Response): Promise<Response | Card[]> {
    const userEmail = request.params.userEmail;

    try {
      return this.linkedinInfoParserService.parseProfileData(data);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
  @httpPost('/parseUser')
  public async parseUser(request: Request, response: Response): Promise<Response | string> {
    const { name } = request.body;

    console.log(name, "name parse");

    try {
      return await this.parserService.parseUser(name);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
