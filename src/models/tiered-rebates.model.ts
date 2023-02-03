// import {Entity, model, property} from '@loopback/repository';

// @model({
//   settings: {idInjection: false, mysql: {schema: 'group_benefitz', table: 'tiered_rebates'}}
// })
// export class TieredRebates extends Entity {
//   @property({
//     type: 'number',
//     id: true,
//     generated: true,
//   })
//   id?: number;

//   @property({
//     type: 'string',
//     required: true,
//     length: 255,
//     mysql: {columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
//   })
//   name: string;

//   @property({
//     type: 'string',
//     required: true,
//     length: 255,
//     mysql: {columnName: 'description', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
//   })
//   description: string;

//   @property({
//     type: 'boolean',
//     precision: 1,
//     mysql: {columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y'},
//   })
//   published?: boolean;

//   // Define well-known properties here

//   // Indexer property to allow additional data
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [prop: string]: any;

//   constructor(data?: Partial<TieredRebates>) {
//     super(data);
//   }
// }

// export interface TieredRebatesRelations {
//   // describe navigational properties here
// }

// export type TieredRebatesWithRelations = TieredRebates & TieredRebatesRelations;
