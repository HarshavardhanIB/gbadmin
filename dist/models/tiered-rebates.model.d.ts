import { Entity } from '@loopback/repository';
export declare class TieredRebates extends Entity {
    description: string;
    id?: number;
    name: string;
    published: boolean;
    [prop: string]: any;
    constructor(data?: Partial<TieredRebates>);
}
export interface TieredRebatesRelations {
}
export declare type TieredRebatesWithRelations = TieredRebates & TieredRebatesRelations;
