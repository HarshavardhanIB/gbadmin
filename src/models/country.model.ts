import {Entity, hasMany, model, property} from '@loopback/repository';
import {StatesAndProvinces} from './states-and-provinces.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'group_benefitz', table: 'country'}}
})
export class Country extends Entity {
  @property({
    type: 'string',
    length: 3,
    generated: 0,
    mysql: { columnName: 'currency', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  currency?: string;

  @property({
    type: 'string',
    length: 3,
    generated: 0,
    mysql: { columnName: 'currency_symbol', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  currencySymbol?: string;

  @property({
    type: 'string',
    length: 3,
    generated: 0,
    mysql: { columnName: 'fusebill_id', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  fusebillId?: string;

  @property({
    type: 'string',
    length: 3,
    generated: 0,
    mysql: { columnName: 'greenshield_code', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  greenshieldCode?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: { columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1 },
  })
  id?: number;

  @property({
    type: 'string',
    length: 5,
    generated: 0,
    mysql: { columnName: 'isocode', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  isocode?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  name?: string;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  published?: boolean;

  @property({
    type: 'string',
    length: 6,
    generated: 0,
    mysql: { columnName: 'short_name', dataType: 'varchar', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  shortName?: string;

  @hasMany(() => StatesAndProvinces, {keyTo: 'country_id'})
  statesAndProvinces: StatesAndProvinces[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;
