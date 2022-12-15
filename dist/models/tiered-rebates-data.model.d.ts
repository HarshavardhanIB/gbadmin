import { Entity } from '@loopback/repository';
export declare class TieredRebatesData extends Entity {
    id: number;
    tieredRebateId: number;
    value: number;
    threshold: number;
    [prop: string]: any;
    constructor(data?: Partial<TieredRebatesData>);
}
export interface TieredRebatesDataRelations {
}
export declare type TieredRebatesDataWithRelations = TieredRebatesData & TieredRebatesDataRelations;
