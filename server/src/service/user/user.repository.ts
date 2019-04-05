import { User } from 'models';

export abstract class UserRepository {
    public abstract getUserByToken(userToken: string): Promise<User>;
    public abstract addUser(userToken: string): Promise<User>;
    public abstract getAllUsers(): Promise<User[]>;
    public abstract cleanUsersCollection(): Promise<boolean>;
    public abstract updateUser(user: User): Promise<boolean>;
    public abstract removeUser(userToken: string): Promise<boolean>;
}
