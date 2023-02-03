"use strict";
// import {Entity, model, property} from '@loopback/repository';
// @model({
//   settings: {
//     idInjection: false,
//     foreignKeys: {
//       fb_rebate_id_tiered_rebate_id: {
//         name: 'fb_rebate_id_tiered_rebate_id',
//         entity: 'TieredRebate',
//         entityKey: 'id',
//         foreignKey: 'tieredRebateId',
//       },
//     },
//     mysql: {schema: 'group_benefitz', table: 'tiered_rebates_data'}
//   }
// })
// export class TieredRebatesData extends Entity {
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
//     mysql: {columnName: 'tiered_rebate_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
//   })
//   tieredRebateId: number;
//   @property({
//     type: 'number',
//     required: true,
//     precision: 12,
//     mysql: {columnName: 'value', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N'},
//   })
//   value: number;
//   @property({
//     type: 'number',
//     required: true,
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'threshold', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
//   })
//   threshold: number;
//   // Define well-known properties here
//   // Indexer property to allow additional data
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [prop: string]: any;
//   constructor(data?: Partial<TieredRebatesData>) {
//     super(data);
//   }
// }
// export interface TieredRebatesDataRelations {
//   // describe navigational properties here
// }
// export type TieredRebatesDataWithRelations = TieredRebatesData & TieredRebatesDataRelations;
//# sourceMappingURL=tiered-rebates-data.model.js.map