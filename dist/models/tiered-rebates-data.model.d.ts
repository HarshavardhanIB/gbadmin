import { Entity } from '@loopback/repository';
export declare class TieredRebatesData extends Entity {
    id: number;
    threshold: number;
    tieredRebateId: number;
    value: number;
    [prop: string]: any;
    constructor(data?: Partial<TieredRebatesData>);
}
export interface TieredRebatesDataRelations {
}
export declare type TieredRebatesDataWithRelations = TieredRebatesData & TieredRebatesDataRelations;
