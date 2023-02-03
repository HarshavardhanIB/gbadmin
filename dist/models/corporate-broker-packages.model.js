"use strict";
// import {Entity, model, property} from '@loopback/repository';
// @model({
//   settings: {
//     idInjection: false,
//     mysql: {schema: 'group_benefitz', table: 'corporate_broker_packages'}
//   }
// })
// export class CorporateBrokerPackages extends Entity {
//   @property({
//     type: 'number',
//     id: true,
//     generated: true,
//   })
//   id?: number;
//   @property({
//     type: 'number',
//     required: true,
//     precision: 3,
//     scale: 0,
//     mysql: {columnName: 'allow_top_up', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N'},
//   })
//   allowTopUp: number;
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
//     precision: 3,
//     scale: 0,
//     mysql: {columnName: 'display_voluntary_benefits', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N'},
//   })
//   displayVoluntaryBenefits: number;
//   @property({
//     type: 'number',
//     required: true,
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'package_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
//   })
//   packageId: number;
//   // Define well-known properties here
//   // Indexer property to allow additional data
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [prop: string]: any;
//   constructor(data?: Partial<CorporateBrokerPackages>) {
//     super(data);
//   }
// }
// export interface CorporateBrokerPackagesRelations {
//   // describe navigational properties here
// }
// export type CorporateBrokerPackagesWithRelations = CorporateBrokerPackages & CorporateBrokerPackagesRelations;
//# sourceMappingURL=corporate-broker-packages.model.js.map