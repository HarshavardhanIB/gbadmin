import { Entity } from '@loopback/repository';
export declare class BrokerAdmins extends Entity {
    id?: number;
    userId: number;
    brokerId: number;
    user_id?: number;
    broker_id?: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerAdmins>);
}
export interface BrokerAdminsRelations {
}
export declare type BrokerAdminsWithRelations = BrokerAdmins & BrokerAdminsRelations;
