import { Status } from 'models';

import { UserState } from './interfaces';

export const initialUserState: UserState = {
  status: Status.Init,
  user: {
    id: null,
  userName: null,
  email: null,
  winGames: 0,
  totalGames: 0  
  }
};
