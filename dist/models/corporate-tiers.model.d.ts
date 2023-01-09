import { Entity } from '@loopback/repository';
export declare class CorporateTiers extends Entity {
    brokerId: number;
    id?: number;
    name: string;
    [prop: string]: any;
    constructor(data?: Partial<CorporateTiers>);
}
export interface CorporateTiersRelations {
}
export declare type CorporateTiersWithRelations = CorporateTiers & CorporateTiersRelations;
