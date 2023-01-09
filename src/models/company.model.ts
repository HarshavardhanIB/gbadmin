import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'gbadmin', table: 'company'}}})
export class Company extends Entity {
  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'company_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  companyName?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'contact_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  contactId?: number;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'description', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  description?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'fusebill_customer_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  fusebillCustomerId?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'fusebill_payment_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  fusebillPaymentId?: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0},
  })
  id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
