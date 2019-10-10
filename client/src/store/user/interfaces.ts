import { User, Status } from 'models';

export interface UserState {
  status: Status;
  user: User;
  errorText?: string;
}

export interface UserHttpData {
  email: string;
  id: string;
  userName: string;
  winGames?: number;
  totalGames?: number;
}
