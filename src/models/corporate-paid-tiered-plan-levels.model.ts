import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'group_benefitz', table: 'corporate_paid_tiered_plan_levels'}
  }
})
export class CorporatePaidTieredPlanLevels extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 12,
    generated: 0,
    mysql: { columnName: 'covered_percentage', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0 },
  })
  coveredPercentage: number;

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
    mysql: { columnName: 'spending_limit', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  spendingLimit: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'tier_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  tierId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CorporatePaidTieredPlanLevels>) {
    super(data);
  }
}

export interface CorporatePaidTieredPlanLevelsRelations {
  // describe navigational properties here
}

export type CorporatePaidTieredPlanLevelsWithRelations = CorporatePaidTieredPlanLevels & CorporatePaidTieredPlanLevelsRelations;
