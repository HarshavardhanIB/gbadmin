import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'gbadmin', table: 'plans_availability'}}
})
export class PlansAvailability extends Entity {
  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: {columnName: 'gst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0},
  })
  gst?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: {columnName: 'hst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0},
  })
  hst?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'plan_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0},
  })
  planId: number;

  @property({
    type: 'number',
    required: true,
    precision: 12,
    generated: 0,
    mysql: {columnName: 'price', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0},
  })
  price: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: {columnName: 'pst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0},
  })
  pst?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: {columnName: 'qst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0},
  })
  qst?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0},
  })
  stateId: number;

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
