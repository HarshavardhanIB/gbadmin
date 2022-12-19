import { Entity } from '@loopback/repository';
export declare class PlanOptionsValues extends Entity {
    id?: number;
    name: string;
    planOptionsId: number;
    reportingEmail?: string;
    value: string;
    [prop: string]: any;
    constructor(data?: Partial<PlanOptionsValues>);
}
export interface PlanOptionsValuesRelations {
}
export declare type PlanOptionsValuesWithRelations = PlanOptionsValues & PlanOptionsValuesRelations;
