import { AppTokenDB } from '../../models';

export abstract class AppTokenRepository {
    abstract saveAppToken(inputString: string): Promise<AppTokenDB>;
    abstract deleteAppToken(appToken: string): Promise<boolean>;
    abstract getAppToken(): Promise<AppTokenDB[]>    
}