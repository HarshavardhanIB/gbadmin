import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'gbadmin', table: 'service_provider'}}
})
export class ServiceProvider extends Entity {
  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'admin_link', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  adminLink?: string;

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
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  name?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'password', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  password?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'username', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  username?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ServiceProvider>) {
    super(data);
  }
}

export interface ServiceProviderRelations {
  // describe navigational properties here
}

export type ServiceProviderWithRelations = ServiceProvider & ServiceProviderRelations;
