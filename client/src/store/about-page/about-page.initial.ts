import { Status } from 'models';

import { AboutPageState } from './interfaces';

export const initialPageState: AboutPageState = {
  status: Status.Init,
  developers: []
};