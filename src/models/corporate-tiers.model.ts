import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'group_benefitz', table: 'corporate_tiers' }
  }
})
export class CorporateTiers extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' },
  })
  brokerId: number;


  @property({
    type: 'string',
    required: true,
    length: 35,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N' },
  })
  name: string;

  @property({
    type: 'number',
    precision: 3,
    scale: 0,
    mysql: { columnName: 'published', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N' },
  })
  published?: number;

  @property({
    type: 'string',
    length: 20,
    mysql: { columnName: 'tier_type', dataType: 'enum', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'N' },
  })
  tierType?: string;
  @property({
    type: 'number',
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'from_length', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  fromLength?: number;
  @property({
    type: 'number',
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'to_length', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  toLength?: number;
  @property({
    type: 'number',
    precision: 12,
    mysql: { columnName: 'income_percentage', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y' },
  })
  incomePercentage: number;
  @property({
    type: 'number',
    precision: 12,
    mysql: { columnName: 'annual_income', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y' },
  })
  annualIncome: number;
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: { columnName: 'spending_limit', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y' },
  })
  spendingLimit?: number;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CorporateTiers>) {
    super(data);
  }
}

export interface CorporateTiersRelations {
  // describe navigational properties here
}

export type CorporateTiersWithRelations = CorporateTiers & CorporateTiersRelations;
