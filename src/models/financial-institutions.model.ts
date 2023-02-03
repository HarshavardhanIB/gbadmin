import {Entity, hasMany, model, property} from '@loopback/repository';
import {FinancialInstitutionsRoutingNumbers} from './financial-institutions-routing-numbers.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'group_benefitz', table: 'financial_institutions'}
  }
})
export class FinancialInstitutions extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: { columnName: 'address', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  address: string;

  @property({
    type: 'string',
    required: true,
    length: 44,
    generated: 0,
    mysql: { columnName: 'category', dataType: 'enum', dataLength: 44, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  category: string;

  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  name: string;

  @hasMany(() => FinancialInstitutionsRoutingNumbers, {keyTo: 'bank_id'})
  branches: FinancialInstitutionsRoutingNumbers[];

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
