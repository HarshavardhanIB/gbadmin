import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'gbadmin', table: 'financial_institutions_routing_numbers' }
  }
})
export class FinancialInstitutionsRoutingNumbers extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: { columnName: 'address', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  address: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'bank_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  bankId: number;

  @property({
    type: 'string',
    required: true,
    length: 3,
    generated: 0,
    mysql: { columnName: 'e_bank_code', dataType: 'char', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  eBankCode: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    generated: 0,
    mysql: { columnName: 'e_transit_number', dataType: 'char', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  eTransitNumber: string;

  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 3,
    generated: 0,
    mysql: { columnName: 'p_bank_code', dataType: 'char', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  pBankCode: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    generated: 0,
    mysql: { columnName: 'p_transit_number', dataType: 'char', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  pTransitNumber: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FinancialInstitutionsRoutingNumbers>) {
    super(data);
  }
}

export interface FinancialInstitutionsRoutingNumbersRelations {
  // describe navigational properties here
}

export type FinancialInstitutionsRoutingNumbersWithRelations = FinancialInstitutionsRoutingNumbers & FinancialInstitutionsRoutingNumbersRelations;
