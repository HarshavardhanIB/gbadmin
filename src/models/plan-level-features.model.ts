import {belongsTo, Entity, model, property} from '@loopback/repository';
import {PlanFeatures} from './plan-features.model';

@model({
  settings: {
    idInjection: false,
    foreignKeys: {
      idx_plans_availability_plan_id: {
        name: 'fk_plan_level_features_plan_id',
        entity: 'PlanFeauters',
        entityKey: 'id',
        foreignKey: 'planFeatureId',
      },
      idx_plans_availability_state_id: {
        name: 'fk_plan_level_features_plan_level_plan_level_id',
        entity: 'PlanLevel',
        entityKey: 'id',
        foreignKey: 'planLevelId',
      },
    },
    mysql: {schema: 'group_benefitz', table: 'plan_level_features'}
  }
})
export class PlanLevelFeatures extends Entity {
   @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;
  
  @property({
    type: 'string',
    length: 65535,
    generated: 0,
    mysql: { columnName: 'description', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  description?: string;



  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'plan_feature_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  planFeatureId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  planLevelId?: number;
 @belongsTo(() => PlanFeatures, {name: 'feature'})
  plan_feature_id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PlanLevelFeatures>) {
    super(data);
  }
}

export interface PlanLevelFeaturesRelations {
  // describe navigational properties here
}

export type PlanLevelFeaturesWithRelations = PlanLevelFeatures & PlanLevelFeaturesRelations;
