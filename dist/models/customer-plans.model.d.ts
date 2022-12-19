import { Entity } from '@loopback/repository';
export declare class CustomerPlans extends Entity {
    activationDate?: string;
    cancellationDate?: string;
    customerId?: number;
    gst?: number;
    gstAmount?: number;
    gstCode?: string;
    gstRate?: number;
    hst?: number;
    hstAmount?: number;
    hstCode?: string;
    hstRate?: number;
    id?: number;
    planId?: number;
    price?: number;
    pst?: number;
    pstAmount?: number;
    pstCode?: string;
    pstRate?: number;
    qst?: number;
    qstAmount?: number;
    qstCode?: string;
    qstRate?: number;
    status?: string;
    subscriptionId?: string;
    [prop: string]: any;
    constructor(data?: Partial<CustomerPlans>);
}
export interface CustomerPlansRelations {
}
export declare type CustomerPlansWithRelations = CustomerPlans & CustomerPlansRelations;
