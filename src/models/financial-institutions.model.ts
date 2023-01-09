import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'gbadmin', table: 'financial_institutions'}
  }
})
export class FinancialInstitutions extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: {columnName: 'address', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  address: string;

  @property({
    type: 'string',
    required: true,
    length: 44,
    generated: 0,
    mysql: {columnName: 'category', dataType: 'enum', dataLength: 44, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  category: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FinancialInstitutions>) {
    super(data);
  }
}

export interface FinancialInstitutionsRelations {
  // describe navigational properties here
}

export type FinancialInstitutionsWithRelations = FinancialInstitutions & FinancialInstitutionsRelations;
