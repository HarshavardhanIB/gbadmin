import { Entity, hasMany, model, property } from '@loopback/repository';
import { PlansAvailability } from './plans-availability.model';

@model({
  settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'states_and_provinces' } }
})
export class StatesAndProvinces extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'country_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  countryId: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'equitable_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  equitableId?: number;

  @property({
    type: 'string',
    length: 2,
    generated: 0,
    mysql: { columnName: 'fusebill_id', dataType: 'varchar', dataLength: 2, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  fusebillId?: string;

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
    length: 45,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  name?: string;

  @property({
    type: 'string',
    length: 2000,
    generated: 0,
    mysql: { columnName: 'provincial_healthcare_url', dataType: 'varchar', dataLength: 2000, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  provincialHealthcareUrl?: string;

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

  @property({
    type: 'string',
    length: 20,
    generated: 0,
    mysql: { columnName: 'zipcodes', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  zipcodes?: string;
  @hasMany(() => PlansAvailability, { keyTo: 'state_id' })
  planAvailability: PlansAvailability[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<StatesAndProvinces>) {
    super(data);
  }
}

export interface StatesAndProvincesRelations {
  // describe navigational properties here
}

export type StatesAndProvincesWithRelations = StatesAndProvinces & StatesAndProvincesRelations;
