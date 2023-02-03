import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false, foreignKeys: {

      idx_customer_contact_id: {

        name: 'idx_customer_contact_id',

        entity: 'Customers',

        entityKey: 'id',

        foreignKey: 'customerId',

      },

      idx_contact_info_id: {

        name: 'idx_contact_info_id',

        entity: 'ContactInformation',

        entityKey: 'id',

        foreignKey: 'contactId',

      },

    }, mysql: { schema: 'gbadmin', table: 'customer_contact_info' }
  }
})
export class CustomerContactInfo extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'contact_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  contactId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'customer_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  customerId?: number;

  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;
  @property({
    type: 'number',
  })
  customer_id?: number;

  @property({
    type: 'number',
  })
  contact_id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CustomerContactInfo>) {
    super(data);
  }
}

export interface CustomerContactInfoRelations {
  // describe navigational properties here
}

export type CustomerContactInfoWithRelations = CustomerContactInfo & CustomerContactInfoRelations;
