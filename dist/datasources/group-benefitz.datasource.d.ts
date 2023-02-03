import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class GroupBenefitzDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        url: string;
        host: string;
        port: string;
        user: string;
        password: string;
        database: string;
        dateStrings: boolean;
        disableMigration: boolean;
    };
    constructor(dsConfig?: object);
}
