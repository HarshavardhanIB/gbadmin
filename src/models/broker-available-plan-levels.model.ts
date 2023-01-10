import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'gbadmin', table: 'broker_available_plan_levels' }
  }
})
export class BrokerAvailablePlanLevels extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  brokerId: number;

  @property({
    type: 'number',

    generated: true,
    id: true
  })
  id?: number;
  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'is_upgradable', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  isUpgradable: boolean;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  planLevelId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BrokerAvailablePlanLevels>) {
    super(data);
  }
}

export interface BrokerAvailablePlanLevelsRelations {
  // describe navigational properties here
}

export type BrokerAvailablePlanLevelsWithRelations = BrokerAvailablePlanLevels & BrokerAvailablePlanLevelsRelations;
