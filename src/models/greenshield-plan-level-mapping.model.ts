import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    foreignKeys: {
      idx_plans_availability_plan_id: {
        name: 'fk_greenshield_plan_level_state_id',
        entity: 'StatesAndProvinces',
        entityKey: 'id',
        foreignKey: 'stateId',
      },
      idx_plans_availability_state_id: {
        name: 'fk_greenshield_plan_level_plan_level_id',
        entity: 'PlanLevel',
        entityKey: 'id',
        foreignKey: 'planLevelId',
      },
    },
    mysql: {schema: 'group_benefitz', table: 'greenshield_plan_level_mapping'}
  }
})
export class GreenshieldPlanLevelMapping extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
    length: 1,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'char', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  name: boolean;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  planLevelId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  stateId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GreenshieldPlanLevelMapping>) {
    super(data);
  }
}

export interface GreenshieldPlanLevelMappingRelations {
  // describe navigational properties here
}

export type GreenshieldPlanLevelMappingWithRelations = GreenshieldPlanLevelMapping & GreenshieldPlanLevelMappingRelations;
