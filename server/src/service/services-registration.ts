import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { UserAuthenticationRepository } from './user-authentication';

export const CONTAINER = new Container();

CONTAINER.bind<UserAuthenticationRepository>(UserAuthenticationRepository).to(UserAuthenticationRepository);

export const inject = getDecorators(CONTAINER).lazyInject;
