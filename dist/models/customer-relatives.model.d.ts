import { Entity } from '@loopback/repository';
export declare class CustomerRelatives extends Entity {
    carrierName?: string;
    cobCoverage?: string;
    customerId: number;
    deleted?: boolean;
    dob?: string;
    email?: string;
    enrolledInUniversity?: boolean;
    firstName: string;
    gender?: string;
    id?: number;
    isDisabled?: boolean;
    lastName: string;
    middleName?: string;
    relationshipType: string;
    uniqueSinId?: string;
    universityGraduationDay?: string;
    customer_id: number;
    [prop: string]: any;
    constructor(data?: Partial<CustomerRelatives>);
}
export interface CustomerRelativesRelations {
}
export declare type CustomerRelativesWithRelations = CustomerRelatives & CustomerRelativesRelations;
