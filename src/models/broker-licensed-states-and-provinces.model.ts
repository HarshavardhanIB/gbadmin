import { belongsTo, Entity, model, property } from '@loopback/repository';
import { StatesAndProvinces } from './states-and-provinces.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'group_benefitz', table: 'broker_licensed_states_and_provinces'}
  }
})
export class BrokerLicensedStatesAndProvinces extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  brokerId: number;

  @property({
    type: 'date',
    generated: 0,
    mysql: { columnName: 'expiry_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  expiryDate?: string;

  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 26,
    generated: 0,
    mysql: { columnName: 'license_coverage', dataType: 'enum', dataLength: 26, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  licenseCoverage: string;

  @property({
    type: 'string',
    required: true,
    length: 35,
    generated: 0,
    mysql: { columnName: 'license_number', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  licenseNumber: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'reminder_email', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  reminderEmail?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  stateId: number;
  @belongsTo(() => StatesAndProvinces, { name: 'stateFullDetails' })
  state_id: number;

  @property({
    type: 'number',
  })
  broker_id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BrokerLicensedStatesAndProvinces>) {
    super(data);
  }
}

export interface BrokerLicensedStatesAndProvincesRelations {
  // describe navigational properties here
}

export type BrokerLicensedStatesAndProvincesWithRelations = BrokerLicensedStatesAndProvinces & BrokerLicensedStatesAndProvincesRelations;
