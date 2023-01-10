import { Entity, hasOne, model, property } from '@loopback/repository';
import { Customer } from './customer.model';

@model({ settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'users' } } })
export class Users extends Entity {
  @property({
    type: 'string',
    length: 100,
    generated: 0,
    mysql: { columnName: 'activation', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  activation?: string;

  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'block', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  block: boolean;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'company_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  companyId?: number;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'deleted', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  deleted?: boolean;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: { columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1 },
  })
  id?: number;

  @property({
    type: 'date',
    generated: 0,
    mysql: { columnName: 'last_login', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  lastLogin?: string;

  @property({
    type: 'string',
    length: 256,
    generated: 0,
    mysql: { columnName: 'otp_key', dataType: 'varchar', dataLength: 256, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  otpKey?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'otp_token', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  otpToken?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'password', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  password?: string;

  @property({
    type: 'date',
    required: true,
    generated: 0,
    mysql: { columnName: 'registration_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  registrationDate: string;

  @property({
    type: 'string',
    length: 21,
    generated: 0,
    mysql: { columnName: 'role', dataType: 'enum', dataLength: 21, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  role?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'username', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  username?: string;
  @hasOne(() => Customer, { keyTo: 'user_id' })
  customer: Customer;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
