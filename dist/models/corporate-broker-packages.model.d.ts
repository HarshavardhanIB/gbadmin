import { Entity } from '@loopback/repository';
export declare class CorporateBrokerPackages extends Entity {
    allowTopUp: number;
    brokerId: number;
    displayVoluntaryBenefits: number;
    id: number;
    packageId: number;
    [prop: string]: any;
    constructor(data?: Partial<CorporateBrokerPackages>);
}
export interface CorporateBrokerPackagesRelations {
}
export declare type CorporateBrokerPackagesWithRelations = CorporateBrokerPackages & CorporateBrokerPackagesRelations;
