import { inject, injectable } from 'inversify';
import { AppTokenRepository } from './app-token.repository';
import { LoggerService } from '../logger';
import { AppTokenDB } from '../../models';

@injectable()
export class AppTokenService {

    public constructor(
        @inject(AppTokenRepository) private appTokenRepository: AppTokenRepository,
        @inject(LoggerService) private loggerService: LoggerService
    ) { }

    public async saveAppToken(inputString: string): Promise<AppTokenDB>{
        try {
            const appToken = await this.appTokenRepository.saveAppToken(inputString);

            return appToken
        } catch {
            const error = 'App token wasn`t saved';
            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async getAppToken(): Promise<AppTokenDB[]>{
        try {
            const appToken = await this.appTokenRepository.getAppToken()

            return appToken
        } catch {
            const error = 'Can`t get application token';
            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }

    public async deleteAppToken(appToken: string): Promise<boolean>{
        try {
            const isDeleted = await this.appTokenRepository.deleteAppToken(appToken);

            return isDeleted
        } catch {
            const error = 'App token wasn`t deleted';
            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}