import { Entity } from '@loopback/repository';
import { PlansAvailability } from './plans-availability.model';
export declare class StatesAndProvinces extends Entity {
    countryId: number;
    equitableId?: number;
    fusebillId?: string;
    id?: number;
    name?: string;
    provincialHealthcareUrl?: string;
    published?: boolean;
    shortName?: string;
    zipcodes?: string;
    planAvailability: PlansAvailability[];
    [prop: string]: any;
    constructor(data?: Partial<StatesAndProvinces>);
}
export interface StatesAndProvincesRelations {
}
export declare type StatesAndProvincesWithRelations = StatesAndProvinces & StatesAndProvincesRelations;
