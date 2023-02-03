import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class GoogleRcDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        crud: boolean;
        options: {
            headers: {
                'content-type': string;
            };
        };
        operations: {
            template: {
                method: string;
                url: string;
                query: {
                    secret: string;
                    response: string;
                };
            };
            functions: {
                validate: string[];
            };
        }[];
        disableMigration: boolean;
    };
    constructor(dsConfig?: object);
}
