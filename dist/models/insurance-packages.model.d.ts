import { Entity } from '@loopback/repository';
export declare class InsurancePackages extends Entity {
    allowMultiple?: boolean;
    applyFilters?: boolean;
    description?: string;
    id?: number;
    logo?: string;
    name?: string;
    optIn?: boolean;
    ordering?: number;
    published?: boolean;
    [prop: string]: any;
    constructor(data?: Partial<InsurancePackages>);
}
export interface InsurancePackagesRelations {
}
export declare type InsurancePackagesWithRelations = InsurancePackages & InsurancePackagesRelations;
