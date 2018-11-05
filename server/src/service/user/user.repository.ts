import { UserDB } from '../../models/user';

export abstract class UserRepository {
    public abstract getUser(userToken: string): Promise<UserDB>;
    public abstract addUserToDb(userToken: string): Promise<UserDB>;
}