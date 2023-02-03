import {Entity, hasMany, model, property} from '@loopback/repository';
import {EquitablePlanLevelMapping} from './equitable-plan-level-mapping.model';
import {GreenshieldPlanLevelMapping} from './greenshield-plan-level-mapping.model';
import {InsurancePlans} from './insurance-plans.model';
import {PlanFeatures} from './plan-features.model';
import {PlanLevelFeatures} from './plan-level-features.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'group_benefitz', table: 'plan_level'}}
})
export class PlanLevel extends Entity {
  @property({
    type: 'string',
    length: 9,
    generated: 0,
    mysql: { columnName: 'background_color', dataType: 'varchar', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  backgroundColor?: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'child_max_age', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  childMaxAge: number;

  @property({
    type: 'string',
    length: 128,
    generated: 0,
    mysql: { columnName: 'description', dataType: 'varchar', dataLength: 128, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  description?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'disallowed_plan_levels', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  disallowedPlanLevels?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: { columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1 },
  })
  id?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'level', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  level?: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'ordering', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  ordering: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'parent_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  parentId?: number;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  published?: boolean;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'require_plan_level', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  requirePlanLevel?: number;

  @property({
    type: 'string',
    length: 9,
    generated: 0,
    mysql: { columnName: 'text_color', dataType: 'varchar', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  textColor?: string;

  @property({
    type: 'string',
    length: 13,
    generated: 0,
    mysql: { columnName: 'tooltip_title', dataType: 'enum', dataLength: 13, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  tooltipTitle?: string;
  
  @hasMany(() => GreenshieldPlanLevelMapping, {keyTo: 'plan_level_id'})
  greenshieldPackages: GreenshieldPlanLevelMapping[];

  @hasMany(() => PlanLevelFeatures, {keyTo: 'plan_level_id'})
  planLevelFeatures: PlanLevelFeatures[];

  @hasMany(() => PlanFeatures, {through: {model: () => PlanLevelFeatures, keyFrom: 'planLevelId', keyTo: 'planFeatureId'}})
  planFeatures: PlanFeatures[];

  @hasMany(() => EquitablePlanLevelMapping, {keyTo: 'plan_level_id'})
  equitablePackages: EquitablePlanLevelMapping[];
  
  @hasMany(() => InsurancePlans, { keyTo: 'plan_level' })
  plans: InsurancePlans[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PlanLevel>) {
    super(data);
  }
}

export interface PlanLevelRelations {
  // describe navigational properties here
}

export type PlanLevelWithRelations = PlanLevel & PlanLevelRelations;
