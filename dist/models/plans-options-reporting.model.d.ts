import { Entity } from '@loopback/repository';
export declare class PlansOptionsReporting extends Entity {
    id?: number;
    email?: string;
    name?: string;
    planLevelId: number;
    reportingData?: string;
    reportingId: string;
    reportingType: string;
    reportingUrl?: string;
    [prop: string]: any;
    constructor(data?: Partial<PlansOptionsReporting>);
}
export interface PlansOptionsReportingRelations {
}
export declare type PlansOptionsReportingWithRelations = PlansOptionsReporting & PlansOptionsReportingRelations;
