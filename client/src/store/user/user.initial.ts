import { Status } from 'models';

import { UserState } from './interfaces';

export const initialUserState: UserState = {
  status: Status.Init,
  user: {
    nickName: null,
    email: null,
    password: null
  }
};
