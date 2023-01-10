import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'tiered_rebates_data' } }
})
export class TieredRebatesData extends Entity {
  @property({
    type: 'number',
    required: true,
    generated: true
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'threshold', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  threshold: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'tiered_rebate_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  tieredRebateId: number;

  @property({
    type: 'number',
    required: true,
    precision: 12,
    generated: 0,
    mysql: { columnName: 'value', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0 },
  })
  value: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TieredRebatesData>) {
    super(data);
  }
}

export interface TieredRebatesDataRelations {
  // describe navigational properties here
}

export type TieredRebatesDataWithRelations = TieredRebatesData & TieredRebatesDataRelations;
