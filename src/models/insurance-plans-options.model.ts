import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    foreignKeys: {
      fk_in_surance_plan_options_insurance_plans_plan_id: {
        name: 'fk_in_surance_plan_options_insurance_plans_plan_id',
        entity: 'InsurancePlans',
        entityKey: 'id',
        foreignKey: 'planId',
      },
      fk_insurance_plan_options_plan_options_id: {
        name: 'fk_insurance_plan_options_plan_options_id',
        entity: 'PlanOptions',
        entityKey: 'id',
        foreignKey: 'planOptionsId',
      },

    },
    mysql: {schema: 'group_benefitz', table: 'insurance_plans_options'}
  }
})
export class InsurancePlansOptions extends Entity {
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
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'plan_options_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  planOptionsId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InsurancePlansOptions>) {
    super(data);
  }
}

export interface InsurancePlansOptionsRelations {
  // describe navigational properties here
}

export type InsurancePlansOptionsWithRelations = InsurancePlansOptions & InsurancePlansOptionsRelations;
