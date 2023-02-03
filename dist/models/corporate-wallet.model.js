"use strict";
// import {Entity, model, property} from '@loopback/repository';
// @model({
//   settings: {
//     idInjection: false,
//     mysql: {schema: 'group_benefitz', table: 'corporate_wallet'}
//   }
// })
// export class CorporateWallet extends Entity {
//   @property({
//     type: 'number',
//     id: true,
//     generated: true,
//   })
//   id?: number;
//   @property({
//     type: 'number',
//     required: true,
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
//   })
//   brokerId: number;
//   @property({
//     type: 'number',
//     required: true,
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'name', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
//   })
//   name: number;
//   @property({
//     type: 'number',
//     required: true,
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'spending_limit', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
//   })
//   spendingLimit: number;
//   @property({
//     type: 'string',
//     required: true,
//     length: 25,
//     mysql: {columnName: 'type', dataType: 'enum', dataLength: 25, dataPrecision: null, dataScale: null, nullable: 'N'},
//   })
//   type: string;
//   // Define well-known properties here
//   // Indexer property to allow additional data
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [prop: string]: any;
//   constructor(data?: Partial<CorporateWallet>) {
//     super(data);
//   }
// }
// export interface CorporateWalletRelations {
//   // describe navigational properties here
// }
// export type CorporateWalletWithRelations = CorporateWallet & CorporateWalletRelations;
//# sourceMappingURL=corporate-wallet.model.js.map