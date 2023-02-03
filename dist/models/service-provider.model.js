"use strict";
// import {Entity, model, property} from '@loopback/repository';
// @model({
//   settings: {
//     idInjection: false,
//     mysql: {schema: 'group_benefitz', table: 'service_provider'}
//   }
// })
// export class ServiceProvider extends Entity {
//   @property({
//     type: 'string',
//     length: 255,
//     mysql: {columnName: 'admin_link', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
//   })
//   adminLink?: string;
//   @property({
//     type: 'number',
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'contact_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
//   })
//   contactId?: number;
//   @property({
//     type: 'string',
//     length: 45,
//     mysql: {columnName: 'description', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
//   })
//   description?: string;
//   @property({
//     type: 'number',
//     id: true,
//     generated: true,
//   })
//   id?: number;
//   @property({
//     type: 'string',
//     length: 45,
//     mysql: {columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
//   })
//   name?: string;
//   @property({
//     type: 'string',
//     length: 255,
//     mysql: {columnName: 'password', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
//   })
//   password?: string;
//   @property({
//     type: 'string',
//     length: 45,
//     mysql: {columnName: 'username', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
//   })
//   username?: string;
//   // Define well-known properties here
//   // Indexer property to allow additional data
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [prop: string]: any;
//   constructor(data?: Partial<ServiceProvider>) {
//     super(data);
//   }
// }
// export interface ServiceProviderRelations {
//   // describe navigational properties here
// }
// export type ServiceProviderWithRelations = ServiceProvider & ServiceProviderRelations;
//# sourceMappingURL=service-provider.model.js.map