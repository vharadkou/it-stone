import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { UserAuthenticationRepository } from './user-authentication';
import { CardRepository } from './card';
import { DeskRepository } from './desk';
import { LinkedinInfoParserService } from './linkedinInfoParser';
import { ParserService } from './parser';
import { AppTokenRepository } from './app-token';
import { UserService, UserRepository, UserRepositoryImplementation } from './user';
import { RoomService, RoomRepository, RoomRepositoryImplementation } from './room';
import { PlayerBindRepository, PlayersBindRepositoryImplementation, PlayersBindService} from './player-bind';
import { SendResultService } from './send-result';
import { LoggerService, LoggerServiceImplementation} from './logger'

export const CONTAINER = new Container();

CONTAINER.bind<AppTokenRepository>(AppTokenRepository).to(AppTokenRepository);
CONTAINER.bind<CardRepository>(CardRepository).to(CardRepository);
CONTAINER.bind<DeskRepository>(DeskRepository).to(DeskRepository);
CONTAINER.bind<PlayerBindRepository>(PlayerBindRepository).to(PlayersBindRepositoryImplementation);
CONTAINER.bind<RoomRepository>(RoomRepository).to(RoomRepositoryImplementation);
CONTAINER.bind<UserAuthenticationRepository>(UserAuthenticationRepository).to(UserAuthenticationRepository);
CONTAINER.bind<UserRepository>(UserRepository).to(UserRepositoryImplementation);

CONTAINER.bind<LinkedinInfoParserService>(LinkedinInfoParserService).to(LinkedinInfoParserService);
CONTAINER.bind<LoggerService>(LoggerService).to(LoggerServiceImplementation);
CONTAINER.bind<ParserService>(ParserService).to(ParserService);
CONTAINER.bind<PlayersBindService>(PlayersBindService).to(PlayersBindService);
CONTAINER.bind<RoomService>(RoomService).to(RoomService);
CONTAINER.bind<SendResultService>(SendResultService).to(SendResultService);
CONTAINER.bind<UserService>(UserService).to(UserService);

export const inject = getDecorators(CONTAINER).lazyInject;
