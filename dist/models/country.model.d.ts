import { Entity } from '@loopback/repository';
import { StatesAndProvinces } from './states-and-provinces.model';
export declare class Country extends Entity {
    currency?: string;
    currencySymbol?: string;
    fusebillId?: string;
    greenshieldCode?: string;
    id?: number;
    isocode?: string;
    name?: string;
    published?: boolean;
    shortName?: string;
    statesAndProvinces: StatesAndProvinces[];
    [prop: string]: any;
    constructor(data?: Partial<Country>);
}
export interface CountryRelations {
}
export declare type CountryWithRelations = Country & CountryRelations;
