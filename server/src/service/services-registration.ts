import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { UserAuthenticationRepository } from './user-authentication';
import { CardRepository } from './card';
import { DeskRepository } from './desk';
import { LinkedinInfoParserService } from './linkedinInfoParser';
import { ParserService } from './parser';
import { AppTokenRepository } from './app-token';
import { RoomService, RoomRepository, RoomRepositoryImplementation } from './room';

export const CONTAINER = new Container();

CONTAINER.bind<AppTokenRepository>(AppTokenRepository).to(AppTokenRepository);
CONTAINER.bind<CardRepository>(CardRepository).to(CardRepository);
CONTAINER.bind<DeskRepository>(DeskRepository).to(DeskRepository);
CONTAINER.bind<RoomRepository>(RoomRepository).to(RoomRepositoryImplementation);
CONTAINER.bind<UserAuthenticationRepository>(UserAuthenticationRepository).to(UserAuthenticationRepository);

CONTAINER.bind<LinkedinInfoParserService>(LinkedinInfoParserService).to(LinkedinInfoParserService);
CONTAINER.bind<ParserService>(ParserService).to(ParserService);
CONTAINER.bind<RoomService>(RoomService).to(RoomService);

export const inject = getDecorators(CONTAINER).lazyInject;
