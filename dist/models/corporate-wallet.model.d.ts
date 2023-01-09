import { Entity } from '@loopback/repository';
export declare class CorporateWallet extends Entity {
    brokerId: number;
    id: number;
    name: number;
    spendingLimit: number;
    type: string;
    [prop: string]: any;
    constructor(data?: Partial<CorporateWallet>);
}
export interface CorporateWalletRelations {
}
export declare type CorporateWalletWithRelations = CorporateWallet & CorporateWalletRelations;
