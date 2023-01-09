import { Entity } from '@loopback/repository';
export declare class TaxTable extends Entity {
    countryId: number;
    id?: number;
    isFederalTax: boolean;
    rate: number;
    stateId?: number;
    taxCode?: string;
    taxName?: string;
    zoneId?: number;
    [prop: string]: any;
    constructor(data?: Partial<TaxTable>);
}
export interface TaxTableRelations {
}
export declare type TaxTableWithRelations = TaxTable & TaxTableRelations;
