// import {Entity, model, property} from '@loopback/repository';

// @model({
//   settings: {
//     idInjection: false,
//     mysql: {schema: 'group_benefitz', table: 'broker_registration'}
//   }
// })
// export class BrokerRegistration extends Entity {
//   @property({
//     type: 'number',
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
//   })
//   brokerId?: number;

//   @property({
//     type: 'number',
//     id: true,
//     generated: true,
//   })
//   id?: number;

//   @property({
//     type: 'number',
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'insurance_company_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
//   })
//   insuranceCompanyId?: number;

//   // Define well-known properties here

//   // Indexer property to allow additional data
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [prop: string]: any;

//   constructor(data?: Partial<BrokerRegistration>) {
//     super(data);
//   }
// }

// export interface BrokerRegistrationRelations {
//   // describe navigational properties here
// }

// export type BrokerRegistrationWithRelations = BrokerRegistration & BrokerRegistrationRelations;
