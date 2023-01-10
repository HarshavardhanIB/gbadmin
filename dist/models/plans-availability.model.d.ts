import { Entity } from '@loopback/repository';
export declare class PlansAvailability extends Entity {
    gst?: number;
    hst?: number;
    id?: number;
    planId: number;
    price: number;
    pst?: number;
    qst?: number;
    stateId: number;
    taxCode?: string;
    taxName?: string;
    state_id: number;
    plan_id: number;
    [prop: string]: any;
    constructor(data?: Partial<PlansAvailability>);
}
export interface PlansAvailabilityRelations {
}
export declare type PlansAvailabilityWithRelations = PlansAvailability & PlansAvailabilityRelations;
