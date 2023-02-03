import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    foreignKeys: {
      fk_plan_options_plan_options_id: {
        name: 'fk_plan_options_plan_options_id',
        entity: 'PlanOptions',
        entityKey: 'id',
        foreignKey: 'planOptionsId',
      }
    },
    mysql: {schema: 'group_benefitz', table: 'plan_options_values'}
  }
})
export class PlanOptionsValues extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  name: string;

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
    length: 255,
    generated: 0,
    mysql: { columnName: 'reporting_email', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  reportingEmail?: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: { columnName: 'value', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  value: string;

  @property({
    type: 'number',
  })
  plan_options_id?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PlanOptionsValues>) {
    super(data);
  }
}

export interface PlanOptionsValuesRelations {
  // describe navigational properties here
}

export type PlanOptionsValuesWithRelations = PlanOptionsValues & PlanOptionsValuesRelations;
