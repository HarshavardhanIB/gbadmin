import { belongsTo, Entity, model, property } from '@loopback/repository';
import { PlanLevel } from './plan-level.model';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'gbadmin', table: 'signup_forms_plan_level_mapping' }
  }
})
export class SignupFormsPlanLevelMapping extends Entity {
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
    mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  planLevelId: number;
  @belongsTo(() => PlanLevel, { name: 'planLevels' })
  plan_level_id: number;

  @property({
    type: 'number',
  })
  form_id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SignupFormsPlanLevelMapping>) {
    super(data);
  }
}

export interface SignupFormsPlanLevelMappingRelations {
  // describe navigational properties here
}

export type SignupFormsPlanLevelMappingWithRelations = SignupFormsPlanLevelMapping & SignupFormsPlanLevelMappingRelations;
