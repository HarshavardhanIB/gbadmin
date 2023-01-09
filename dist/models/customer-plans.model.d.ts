import { Entity } from '@loopback/repository';
export declare class CustomerPlans extends Entity {
    activationDate?: string;
    cancellationDate?: string;
    customerId?: number;
    gst?: number;
    hst?: number;
    id?: number;
    planId?: number;
    price?: number;
    pst?: number;
    qst?: number;
    status?: string;
    subscriptionId?: string;
    [prop: string]: any;
    constructor(data?: Partial<CustomerPlans>);
}
export interface CustomerPlansRelations {
}
export declare type CustomerPlansWithRelations = CustomerPlans & CustomerPlansRelations;
