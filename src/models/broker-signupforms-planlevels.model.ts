import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'gbadmin', table: 'broker_signupforms_planlevels' }
  }
})
export class BrokerSignupformsPlanlevels extends Entity {
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
    mysql: { columnName: 'planlevel_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  planlevelId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BrokerSignupformsPlanlevels>) {
    super(data);
  }
}

export interface BrokerSignupformsPlanlevelsRelations {
  // describe navigational properties here
}

export type BrokerSignupformsPlanlevelsWithRelations = BrokerSignupformsPlanlevels & BrokerSignupformsPlanlevelsRelations;
