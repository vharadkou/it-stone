import { inject, injectable } from 'inversify';
import { CommunityLayer, GameResult, ResultStatus, ParticipationStatus } from 'community-layer';
import { AppTokenRepository } from 'service/app-token';
import { LoggerService } from 'service/logger';
const communityLayer = new CommunityLayer();

@injectable()
export class SendResultService {
    constructor(
        @inject(AppTokenRepository) private appTokenRepository: AppTokenRepository,
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    public async sendResult(token: string): Promise<boolean> {
        
        let appToken: string;

        try {
            appToken = 'Bearer ' + (await this.appTokenRepository.getAppToken())[0].token;            
        } catch {
            const error = 'Apptoken error';
            
            this.loggerService.errorLog(error)
            throw new Error(error);
        }

        let userToken = token;       

        const finalUsersStat = {
            userToken, 
            playedTime: 29,
            scores: 29,
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
