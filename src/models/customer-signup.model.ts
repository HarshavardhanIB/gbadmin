import {belongsTo, Entity, model, property} from '@loopback/repository';
import {SignupForms} from './signup-forms.model';

@model({
  settings: {
    idInjection: false, 
    foreignKeys: {

      fk_customer_signup_customers_customer_id: {

        name: 'fk_customer_signup_customers_customer_id',

        entity: 'Customers',

        entityKey: 'id',

        foreignKey: 'customerId',

      }

    }, 
    mysql: {schema: 'group_benefitz', table: 'customer_signup'}
  }
})
export class CustomerSignup extends Entity {
  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'company_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  companyName?: string;

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
    type: 'date',
    required: true,
    generated: 0,
    mysql: { columnName: 'enrollment_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  enrollmentDate: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'form_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  formId: number;

  @property({
    type: 'date',
    required: true,
    generated: 0,
    mysql: { columnName: 'hiring_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  hiringDate: string;

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
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'job_title', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  jobTitle?: string;

  @property({
    type: 'string',
    required: true,
    length: 7,
    generated: 0,
    mysql: { columnName: 'marital_status', dataType: 'enum', dataLength: 7, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  maritalStatus: string;

  @property({
    type: 'boolean',
//    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'opt_in_pills', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  optInPills?: boolean;

  @property({
    type: 'boolean',
  //  required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'provincial_health_care', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  provincialHealthCare?: boolean;

  @property({
    type: 'boolean',
 //   required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'read_advisor_disclosure', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  readAdvisorDisclosure?: boolean;

  @property({
    type: 'string',
  //  required: true,
    length: 65535,
    generated: 0,
    mysql: { columnName: 'signature', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  signature?: string;

  @property({
    type: 'date',
    required: true,
    generated: 0,
    mysql: { columnName: 'signup_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  signupDate: string;

  @property({
    type: 'boolean',
    //required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'terms_and_conditions', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  termsAndConditions?: boolean;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'weekly_hours', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  weeklyHours: number;

  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'working_20hours', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  working_20hours: boolean;
//  @property({
 //   type: 'number',
 // })
 // form_id?: number;

  @property({
    type: 'number',
  })
  customer_id?: number;
  @belongsTo(() => SignupForms, {name: 'form'})
  form_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CustomerSignup>) {
    super(data);
  }
}

export interface CustomerSignupRelations {
  // describe navigational properties here
}

export type CustomerSignupWithRelations = CustomerSignup & CustomerSignupRelations;
