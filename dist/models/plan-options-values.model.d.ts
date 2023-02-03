import { Entity } from '@loopback/repository';
export declare class PlanOptionsValues extends Entity {
    id?: number;
    name: string;
    planOptionsId: number;
    reportingEmail?: string;
    value: string;
    plan_options_id?: number;
    [prop: string]: any;
    constructor(data?: Partial<PlanOptionsValues>);
}
export interface PlanOptionsValuesRelations {
}
export declare type PlanOptionsValuesWithRelations = PlanOptionsValues & PlanOptionsValuesRelations;
