import { Entity } from '@loopback/repository';
export declare class PlanOptions extends Entity {
    description?: string;
    id?: number;
    name: string;
    type: string;
    [prop: string]: any;
    constructor(data?: Partial<PlanOptions>);
}
export interface PlanOptionsRelations {
}
export declare type PlanOptionsWithRelations = PlanOptions & PlanOptionsRelations;
