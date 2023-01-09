import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'gbadmin', table: 'equitable_plan_level_mapping'}
  }
})
export class EquitablePlanLevelMapping extends Entity {
  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'class_code', dataType: 'varchar', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  classCode?: string;

  @property({
    type: 'string',
    length: 100,
    generated: 0,
    mysql: {columnName: 'class_name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  className?: string;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'division_code', dataType: 'varchar', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  divisionCode?: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    generated: 0,
    mysql: {columnName: 'division_name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  divisionName: string;

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
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  planLevelId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  stateId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EquitablePlanLevelMapping>) {
    super(data);
  }
}

export interface EquitablePlanLevelMappingRelations {
  // describe navigational properties here
}

export type EquitablePlanLevelMappingWithRelations = EquitablePlanLevelMapping & EquitablePlanLevelMappingRelations;
