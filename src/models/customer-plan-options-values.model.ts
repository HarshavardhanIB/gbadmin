import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { table: 'customer_plan_options_values' }
  }
})
export class CustomerPlanOptionsValues extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'customer_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  customerId: number;

  @property({
    type: 'number',
    // precision: 10,
    // scale: 0,
    generated: 1,
    id: 1
    // mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'plan_options_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  planOptionsId: number;

  @property({
    type: 'string',
    length: 65535,
    generated: 0,
    mysql: { columnName: 'plan_options_value', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  planOptionsValue?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CustomerPlanOptionsValues>) {
    super(data);
  }
}

export interface CustomerPlanOptionsValuesRelations {
  // describe navigational properties here
}

export type CustomerPlanOptionsValuesWithRelations = CustomerPlanOptionsValues & CustomerPlanOptionsValuesRelations;
