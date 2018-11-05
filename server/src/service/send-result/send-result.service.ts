import { inject, injectable } from 'inversify';
import { CommunityLayer, GameResult, ResultStatus, ParticipationStatus } from 'community-layer';
import { AppTokenRepository } from '../app-token/app-token.repository';
import { UserService } from '../user/user.service';
import { LoggerService } from 'service/logger';
const communityLayer = new CommunityLayer();

@injectable()
export class SendResultService {
    constructor(
        @inject(AppTokenRepository) private appTokenRepository: AppTokenRepository,
        @inject(UserService) private userService: UserService,
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    public async sendResult(token: string): Promise<boolean> {
        /* let userId: string;
        let scores: number = 0;
        let appToken: string;
        let finalUsersStat;

        try {
            userId = (await this.userService.getUser(userToken)).userToken
        } catch {
            const error = 'send user error';

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        try {
            appToken = 'Bearer ' + (await this.appTokenRepository.getAppToken())[0].token
        } catch {
            const error = 'Get token error';

            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        scores = 2000; */

        let appToken: string;

        try {
            appToken = 'Bearer ' + (await this.appTokenRepository.getAppToken())[0].token;
        } catch {
            const error = 'Apptoken error';
            
            this.loggerService.errorLog(error);
            throw new Error(error);
        }

        const finalUsersStat = {
            userToken: '28f60f26-df97-4566-9749-bfd7e9bfb9c9', 
            playedTime: 33,
            scores: 33,
            resultStatus: ResultStatus.Lose, 
            participationStatus: ParticipationStatus.Play,
        }
        this.loggerService.infoLog('Dispatching data');
        const userStatistics: GameResult[] = [];
        userStatistics.push(finalUsersStat);
        communityLayer.gameCycle.setGameResult(userStatistics, appToken);

        return true
    }
}
