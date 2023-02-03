import { Entity } from '@loopback/repository';
import { FinancialInstitutionsRoutingNumbers } from './financial-institutions-routing-numbers.model';
export declare class FinancialInstitutions extends Entity {
    address: string;
    category: string;
    id?: number;
    name: string;
    branches: FinancialInstitutionsRoutingNumbers[];
    [prop: string]: any;
    constructor(data?: Partial<FinancialInstitutions>);
}
export interface FinancialInstitutionsRelations {
}
export declare type FinancialInstitutionsWithRelations = FinancialInstitutions & FinancialInstitutionsRelations;
