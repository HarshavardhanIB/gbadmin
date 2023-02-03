import { Entity } from '@loopback/repository';
import { InsurancePlans } from './insurance-plans.model';
import { PlansAvailability } from './plans-availability.model';
export declare class StatesAndProvinces extends Entity {
    id?: number;
    countryId: number;
    equitableId?: number;
    fusebillId?: string;
    name?: string;
    provincialHealthcareUrl?: string;
    published?: boolean;
    shortName?: string;
    zipcodes?: string;
    insurancePlans: InsurancePlans[];
    country_id: number;
    planAvailability: PlansAvailability[];
    [prop: string]: any;
    constructor(data?: Partial<StatesAndProvinces>);
}
export interface StatesAndProvincesRelations {
}
export declare type StatesAndProvincesWithRelations = StatesAndProvinces & StatesAndProvincesRelations;
