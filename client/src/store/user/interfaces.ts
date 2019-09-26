import { User, Status } from 'models';

export interface UserState {
  status: Status;
  user: User;
  errorText?: string;
}
