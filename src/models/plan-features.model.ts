import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'plan_features' } }
})
export class PlanFeatures extends Entity {
  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'category', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  category?: string;

  @property({
    type: 'string',
    length: 400,
    generated: 0,
    mysql: { columnName: 'description', dataType: 'varchar', dataLength: 400, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  description?: string;

  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  name?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PlanFeatures>) {
    super(data);
  }
}

export interface PlanFeaturesRelations {
  // describe navigational properties here
}

export type PlanFeaturesWithRelations = PlanFeatures & PlanFeaturesRelations;
