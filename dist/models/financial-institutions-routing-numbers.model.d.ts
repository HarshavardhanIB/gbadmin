import { Entity } from '@loopback/repository';
export declare class FinancialInstitutionsRoutingNumbers extends Entity {
    address: string;
    bankId: number;
    eBankCode: string;
    eTransitNumber: string;
    id?: number;
    pBankCode: string;
    pTransitNumber: string;
    [prop: string]: any;
    constructor(data?: Partial<FinancialInstitutionsRoutingNumbers>);
}
export interface FinancialInstitutionsRoutingNumbersRelations {
}
export declare type FinancialInstitutionsRoutingNumbersWithRelations = FinancialInstitutionsRoutingNumbers & FinancialInstitutionsRoutingNumbersRelations;
