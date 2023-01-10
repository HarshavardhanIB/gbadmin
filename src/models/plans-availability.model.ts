import { belongsTo, Entity, model, property } from '@loopback/repository';
import { InsurancePlans } from './insurance-plans.model';
import { StatesAndProvinces } from './states-and-provinces.model';

@model({
  settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'plans_availability' } }
})
export class PlansAvailability extends Entity {
  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'gst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  gst?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'hst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  hst?: number;

  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'plan_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  planId: number;

  @property({
    type: 'number',
    required: true,
    precision: 12,
    generated: 0,
    mysql: { columnName: 'price', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0 },
  })
  price: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'pst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  pst?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'qst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  qst?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  stateId: number;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'tax_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  taxCode?: string;

  @property({
    type: 'string',
    length: 15,
    generated: 0,
    mysql: { columnName: 'tax_name', dataType: 'varchar', dataLength: 15, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  taxName?: string;
  @belongsTo(() => StatesAndProvinces, { name: 'state' })
  state_id: number;

  @belongsTo(() => InsurancePlans, { name: 'plan' })
  plan_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PlansAvailability>) {
    super(data);
  }
}

export interface PlansAvailabilityRelations {
  // describe navigational properties here
}

export type PlansAvailabilityWithRelations = PlansAvailability & PlansAvailabilityRelations;
