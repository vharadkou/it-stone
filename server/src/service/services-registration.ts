import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { UserAuthenticationRepository } from './user-authentication';
import { CardRepository } from './card';
import { DeskRepository } from './desk';
import { LinkedinInfoParserService } from './linkedinInfoParser';

export const CONTAINER = new Container();

CONTAINER.bind<UserAuthenticationRepository>(UserAuthenticationRepository).to(UserAuthenticationRepository);
CONTAINER.bind<CardRepository>(CardRepository).to(CardRepository);
CONTAINER.bind<DeskRepository>(DeskRepository).to(DeskRepository);
CONTAINER.bind<LinkedinInfoParserService>(LinkedinInfoParserService).to(LinkedinInfoParserService);

export const inject = getDecorators(CONTAINER).lazyInject;
