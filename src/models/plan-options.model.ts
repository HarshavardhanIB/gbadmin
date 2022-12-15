import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'gbadmin', table: 'plan_options'}}
})
export class PlanOptions extends Entity {
  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'description', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  description?: string;

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
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    generated: 0,
    mysql: {columnName: 'type', dataType: 'enum', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  type: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PlanOptions>) {
    super(data);
  }
}

export interface PlanOptionsRelations {
  // describe navigational properties here
}

export type PlanOptionsWithRelations = PlanOptions & PlanOptionsRelations;
