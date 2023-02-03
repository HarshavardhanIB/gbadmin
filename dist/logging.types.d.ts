import { Options } from '@loopback/repository';
import { LoggingRepository } from './repositories';
export declare const LogDbSourceName = "groupBenefitz";
export interface ILogMixin<UserID> {
    getLoggingRepository: () => Promise<LoggingRepository>;
    getCurrentUser?: () => Promise<{
        id?: UserID;
    }>;
}
export interface ILogMixinOptions {
    actionKey: string;
    [key: string]: any;
}
export interface LogOption {
    noLogging: boolean;
    source: string;
}
export declare type LogOptions = Options & LogOption;
