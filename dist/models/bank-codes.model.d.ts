import { Entity } from '@loopback/repository';
export declare class BankCodes extends Entity {
    id: number;
    bankId: number;
    bankCode: string;
    bank_id: number;
    [prop: string]: any;
    constructor(data?: Partial<BankCodes>);
}
export interface BankCodesRelations {
}
export declare type BankCodesWithRelations = BankCodes & BankCodesRelations;
