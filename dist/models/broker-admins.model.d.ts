import { Entity } from '@loopback/repository';
export declare class BrokerAdmins extends Entity {
    brokerId: number;
    id?: number;
    userId: number;
    [prop: string]: any;
    constructor(data?: Partial<BrokerAdmins>);
}
export interface BrokerAdminsRelations {
}
export declare type BrokerAdminsWithRelations = BrokerAdmins & BrokerAdminsRelations;
