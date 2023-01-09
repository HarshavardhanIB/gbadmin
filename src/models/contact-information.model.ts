import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'gbadmin', table: 'contact_information'}}
})
export class ContactInformation extends Entity {
  @property({
    type: 'string',
    length: 16,
    generated: 0,
    mysql: {columnName: 'address_type', dataType: 'enum', dataLength: 16, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  addressType?: string;

  @property({
    type: 'string',
    length: 5,
    generated: 0,
    mysql: {columnName: 'apt', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  apt?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'city', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  city?: string;

  @property({
    type: 'string',
    length: 17,
    generated: 0,
    mysql: {columnName: 'contact_type', dataType: 'enum', dataLength: 17, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  contactType?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'country', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  country?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'fusebill_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  fusebillId?: string;

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
    length: 255,
    generated: 0,
    mysql: {columnName: 'line1', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  line1?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'line2', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  line2?: string;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'postal_code', dataType: 'varchar', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  postalCode?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'primary_email', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  primaryEmail?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'primary_phone', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  primaryPhone?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'secondary_email', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  secondaryEmail?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'secondary_phone', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  secondaryPhone?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'state', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  state?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ContactInformation>) {
    super(data);
  }
}

export interface ContactInformationRelations {
  // describe navigational properties here
}

export type ContactInformationWithRelations = ContactInformation & ContactInformationRelations;
