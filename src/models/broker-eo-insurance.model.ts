import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'gbadmin', table: 'broker_eo_insurance'}}
})
export class BrokerEoInsurance extends Entity {
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
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0},
  })
  brokerId: number;

  @property({
    type: 'string',
    required: true,
    length: 35,
    generated: 0,
    mysql: {columnName: 'insurer_name', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  insurerName: string;

  @property({
    type: 'string',
    required: true,
    length: 35,
    generated: 0,
    mysql: {columnName: 'policy_number', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  policyNumber: string;

  @property({
    type: 'string',
    required: true,
    length: 35,
    generated: 0,
    mysql: {columnName: 'certificate_number', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  certificateNumber: string;

  @property({
    type: 'date',
    required: true,
    generated: 0,
    mysql: {columnName: 'expiry_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  expiryDate: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BrokerEoInsurance>) {
    super(data);
  }
}

export interface BrokerEoInsuranceRelations {
  // describe navigational properties here
}

export type BrokerEoInsuranceWithRelations = BrokerEoInsurance & BrokerEoInsuranceRelations;
