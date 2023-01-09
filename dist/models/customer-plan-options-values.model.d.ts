import { Entity } from '@loopback/repository';
export declare class CustomerPlanOptionsValues extends Entity {
    customerId: number;
    id?: number;
    planOptionsId: number;
    planOptionsValue?: string;
    [prop: string]: any;
    constructor(data?: Partial<CustomerPlanOptionsValues>);
}
export interface CustomerPlanOptionsValuesRelations {
}
export declare type CustomerPlanOptionsValuesWithRelations = CustomerPlanOptionsValues & CustomerPlanOptionsValuesRelations;
