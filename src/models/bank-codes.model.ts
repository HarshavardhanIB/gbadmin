import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'bank_codes' } }
})
export class BankCodes extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 3,
    generated: 0,
    mysql: { columnName: 'bank_code', dataType: 'char', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  bankCode: string;

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
    type: 'number',

    generated: true,
    id: true
  })
  id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BankCodes>) {
    super(data);
  }
}

export interface BankCodesRelations {
  // describe navigational properties here
}

export type BankCodesWithRelations = BankCodes & BankCodesRelations;
