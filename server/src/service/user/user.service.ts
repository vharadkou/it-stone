import { inject, injectable } from 'inversify';
import { UserRepository} from './user.repository'
import { UserDB } from '../../models/user';
import { LoggerService } from 'service/logger';

@injectable()
export class UserService {
    
    constructor(
        @inject(UserRepository) private userRepository: UserRepository,
        @inject(LoggerService) private loggerService: LoggerService
    ) { }

    public async getUser(userToken: string): Promise<UserDB> {
        try {
            let userID = await this.userRepository.getUser(userToken);            

            return userID;
        } catch {
            const error = 'get user error';
            throw new Error(error)
        }

    }

    public async addUserToDb(userToken: string): Promise<UserDB> {
        try {
            let usersArray = await this.userRepository.getAllUsersTokens();

            if (usersArray.map(item => item.userToken).indexOf(userToken) !== -1 ) {                
                this.loggerService.infoLog('User already exist in database');

                return
            } 
            const addedUser = await this.userRepository.addUserToDb(userToken);                       
            
            return addedUser;
        } catch {
            const error = 'add user error';
            throw new Error(error);
        }
    }

    public async cleanUsersCollection(): Promise<boolean> {        
        try {            
            const isCleaned = await this.userRepository.cleanUsersCollection()

            return isCleaned
        } catch {
            const error = 'Cleaning of user database failed';
            throw new Error(error);
        }        
    }
    
}