import { Entity } from '@loopback/repository';
import { PlanOptionsValues } from './plan-options-values.model';
export declare class PlanOptions extends Entity {
    description?: string;
    id?: number;
    name: string;
    type: string;
    planOptionsValues: PlanOptionsValues[];
    [prop: string]: any;
    constructor(data?: Partial<PlanOptions>);
}
export interface PlanOptionsRelations {
}
export declare type PlanOptionsWithRelations = PlanOptions & PlanOptionsRelations;
