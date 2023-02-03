// import {Entity, model, property} from '@loopback/repository';

// @model({
//   settings: {
//     idInjection: false,
//     mysql: {schema: 'group_benefitz', table: 'insurance_company'}
//   }
// })
// export class InsuranceCompany extends Entity {
//   @property({
//     type: 'number',
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'contact_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
//   })
//   contactId?: number;

//   @property({
//     type: 'boolean',
//     precision: 1,
//     mysql: {columnName: 'deleted', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y'},
//   })
//   deleted?: boolean;

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
//     length: 255,
//     mysql: {columnName: 'link', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
//   })
//   link?: string;

//   @property({
//     type: 'string',
//     length: 255,
//     mysql: {columnName: 'logo', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
//   })
//   logo?: string;

//   @property({
//     type: 'string',
//     length: 45,
//     mysql: {columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
//   })
//   name?: string;

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

//   constructor(data?: Partial<InsuranceCompany>) {
//     super(data);
//   }
// }

// export interface InsuranceCompanyRelations {
//   // describe navigational properties here
// }

// export type InsuranceCompanyWithRelations = InsuranceCompany & InsuranceCompanyRelations;
