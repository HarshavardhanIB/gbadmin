import { Entity } from '@loopback/repository';
export declare class FinancialInstitutions extends Entity {
    address: string;
    category: string;
    id?: number;
    name: string;
    [prop: string]: any;
    constructor(data?: Partial<FinancialInstitutions>);
}
export interface FinancialInstitutionsRelations {
}
export declare type FinancialInstitutionsWithRelations = FinancialInstitutions & FinancialInstitutionsRelations;
