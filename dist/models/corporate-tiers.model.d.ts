import { Entity } from '@loopback/repository';
export declare class CorporateTiers extends Entity {
    id?: number;
    brokerId: number;
    name: string;
    published?: number;
    tierType?: string;
    fromLength?: number;
    toLength?: number;
    incomePercentage: number;
    annualIncome: number;
    spendingLimit?: number;
    [prop: string]: any;
    constructor(data?: Partial<CorporateTiers>);
}
export interface CorporateTiersRelations {
}
export declare type CorporateTiersWithRelations = CorporateTiers & CorporateTiersRelations;
