import { belongsTo, Entity, model, property } from '@loopback/repository';
import { Customer } from './customer.model';

@model({
  settings: {
    idInjection: false, foreignKeys: {
      fk_customer_relatives_customers_customer_id: {

        name: 'idx_customer_relative_id',

        entity: 'Customers',

        entityKey: 'id',

        foreignKey: 'customerId',

      }

    }, mysql: { schema: 'gbadmin', table: 'customer_relatives' }
  }
})
export class CustomerRelatives extends Entity {
  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'carrier_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  carrierName?: string;

  @property({
    type: 'string',
    length: 6,
    generated: 0,
    mysql: { columnName: 'cob_coverage', dataType: 'enum', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  cobCoverage?: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'customer_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  customerId: number;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'deleted', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  deleted?: boolean;

  @property({
    type: 'date',
    generated: 0,
    mysql: { columnName: 'dob', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  dob?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'email', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  email?: string;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'enrolled_in_university', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  enrolledInUniversity?: boolean;

  @property({
    type: 'string',
    required: true,
    length: 45,
    generated: 0,
    mysql: { columnName: 'first_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  firstName: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'gender', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  gender?: string;

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
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'is_disabled', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  isDisabled?: boolean;

  @property({
    type: 'string',
    required: true,
    length: 45,
    generated: 0,
    mysql: { columnName: 'last_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  lastName: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'middle_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
    length: 8,
    generated: 0,
    mysql: { columnName: 'relationship_type', dataType: 'enum', dataLength: 8, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  relationshipType: string;

  @property({
    type: 'string',
    length: 9,
    generated: 0,
    mysql: { columnName: 'unique_sin_id', dataType: 'varchar', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  uniqueSinId?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: { columnName: 'university_graduation_day', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  universityGraduationDay?: string;
  @belongsTo(() => Customer, { name: 'customer' })
  customer_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CustomerRelatives>) {
    super(data);
  }
}

export interface CustomerRelativesRelations {
  // describe navigational properties here
}

export type CustomerRelativesWithRelations = CustomerRelatives & CustomerRelativesRelations;
