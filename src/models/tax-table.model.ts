import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'tax_table' } } })
export class TaxTable extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'country_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  countryId: number;

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
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'is_federal_tax', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  isFederalTax: boolean;

  @property({
    type: 'number',
    required: true,
    precision: 12,
    generated: 0,
    mysql: { columnName: 'rate', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0 },
  })
  rate: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'state_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  stateId?: number;

  @property({
    type: 'string',
    length: 5,
    generated: 0,
    mysql: { columnName: 'tax_code', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  taxCode?: string;

  @property({
    type: 'string',
    length: 3,
    generated: 0,
    mysql: { columnName: 'tax_name', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  taxName?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'zone_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  zoneId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TaxTable>) {
    super(data);
  }
}

export interface TaxTableRelations {
  // describe navigational properties here
}

export type TaxTableWithRelations = TaxTable & TaxTableRelations;
