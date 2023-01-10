import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'gbadmin', table: 'broker_signup_forms_plans' }
  }
})
export class BrokerSignupFormsPlans extends Entity {
  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'covered_percentage', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  coveredPercentage?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'form_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  formId: number;

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
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'rebate_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  rebateId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BrokerSignupFormsPlans>) {
    super(data);
  }
}

export interface BrokerSignupFormsPlansRelations {
  // describe navigational properties here
}

export type BrokerSignupFormsPlansWithRelations = BrokerSignupFormsPlans & BrokerSignupFormsPlansRelations;
