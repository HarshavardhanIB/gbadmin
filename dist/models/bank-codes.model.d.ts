import { Entity } from '@loopback/repository';
export declare class BankCodes extends Entity {
    bankCode: string;
    bankId: number;
    id?: number;
    [prop: string]: any;
    constructor(data?: Partial<BankCodes>);
}
export interface BankCodesRelations {
}
export declare type BankCodesWithRelations = BankCodes & BankCodesRelations;
