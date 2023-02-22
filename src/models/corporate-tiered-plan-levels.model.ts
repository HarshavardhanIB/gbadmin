import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'group_benefitz', table: 'corporate_tiered_plan_levels' }
  }
})
export class CorporateTieredPlanLevels extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    precision: 12,
    mysql: { columnName: 'covered_percentage', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N' },
  })
  coveredPercentage: number;
  @property({
    type: 'number',
    //required: true,
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'paid_by_company', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
  })
  paidByCompany?: number;
  @property({
    type: 'number',
    //required: true,
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'covered_by_company', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
  })
  coveredByCompany?: number;
  @property({
    type: 'number',
    //required: true,
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'paid_by_employee', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
  })
  paidByEmployee?: number;
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
  })
  planLevelId: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { columnName: 'spending_limit', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
  })
  spendingLimit: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { columnName: 'tier_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
  })
  tierId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CorporateTieredPlanLevels>) {
    super(data);
  }
}

export interface CorporateTieredPlanLevelsRelations {
  // describe navigational properties here
}

export type CorporateTieredPlanLevelsWithRelations = CorporateTieredPlanLevels & CorporateTieredPlanLevelsRelations;
