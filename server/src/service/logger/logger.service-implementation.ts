import { injectable } from 'inversify';

import {
    createLogger,
    Logger,
    format,
    transports
} from 'winston';

import appConfig from '../config/app.config.json';
import loggerConfig from '../config/logger.config.json';

import { LoggerService } from './logger.service';

@injectable()
export class LoggerServiceImplementation implements LoggerService{

    private logger: Logger = createLogger({
        level: loggerConfig.level,
        format: format.json(),
        transports: [
            new transports.File({ filename: loggerConfig.errorLogName, level: loggerConfig.errorLevel }),
            new transports.File({ filename: loggerConfig.combinedLogName })
        ]
    });

    constructor(){
        if (process.env.NODE_ENV !== appConfig.production) {
            this.logger.add(new transports.Console({
                format: format.simple()
            }));
        }
    }

    public infoLog(message: string): void {
        this.logger.info(message);
    }

    public errorLog(message: string): void {
        this.logger.error(message);
    }

}