import { belongsTo, Entity, model, property, hasMany, hasOne } from '@loopback/repository';
import { Users } from './users.model';
import { CustomerRelatives } from './customer-relatives.model';
import { CustomerPlans } from './customer-plans.model';
import { CustomerSignup } from './customer-signup.model';
import { ContactInformation } from './contact-information.model';
import { CustomerContactInfo } from './customer-contact-info.model';
import { InsurancePlans } from './insurance-plans.model';
import {CustomerPlanOptionsValues} from './customer-plan-options-values.model';

@model({
  settings: {
    idInjection: false, foreignKeys: {
      idx_customer_user_id: {
        name: 'idx_customer_user_id',
        entity: 'Users',
        entityKey: 'id',
        foreignKey: 'userId',
      },
    }, mysql: { table: 'customer' }
  }
})
export class Customer extends Entity {
  @belongsTo(() => Users, { name: 'user' })
  user_id: number;
  @property({
    type: 'date',
    generated: 0,
    mysql: { columnName: 'cc_expiry', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  ccExpiry?: string;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'cc_expiry_alert_sent', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  ccExpiryAlertSent?: boolean;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'company_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  companyId?: number;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'company_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  companyName?: string;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'deleted', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  deleted?: boolean;

  @property({
    type: 'date',
    required: true,
    generated: 0,
    mysql: { columnName: 'dob', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  dob: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'equitable_certificate_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  equitableCertificateId?: string;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: { columnName: 'equitable_registration_status', dataType: 'enum', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  equitableRegistrationStatus?: string;

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
    mysql: { columnName: 'fusebill_customer_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  fusebillCustomerId?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'fusebill_payment_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  fusebillPaymentId?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'gender', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  gender?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'greenshield_member_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  greenshieldMemberId?: string;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: { columnName: 'greenshield_registration_status', dataType: 'enum', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  greenshieldRegistrationStatus?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'group_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  groupId?: number;

  @property({
    type: 'number',
    // precision: 10,
    // scale: 0,
    generated: 1,
    id: 1
    //   mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

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
    length: 6,
    generated: 0,
    mysql: { columnName: 'marital_status', dataType: 'enum', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  maritalStatus?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'middle_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  middleName?: string;

  @property({
    type: 'number',
    required: true,
    precision: 12,
    generated: 0,
    mysql: { columnName: 'monthly_recurring_revenue', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'N', generated: 0 },
  })
  monthlyRecurringRevenue: number;

  @property({
    type: 'string',
    required: true,
    length: 11,
    generated: 0,
    mysql: { columnName: 'payment_method', dataType: 'enum', dataLength: 11, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  paymentMethod: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'payment_method_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  paymentMethodId?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'plan_level', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  planLevel?: number;

  @property({
    type: 'date',
    required: true,
    generated: 0,
    mysql: { columnName: 'registration_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  registrationDate: string;

  @property({
    type: 'string',
    length: 65535,
    generated: 0,
    mysql: { columnName: 'signature', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  signature?: string;

  @property({
    type: 'string',
    length: 9,
    generated: 0,
    mysql: { columnName: 'status', dataType: 'enum', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  status?: string;

  @property({
    type: 'string',
    length: 9,
    generated: 0,
    mysql: { columnName: 'unique_sin_id', dataType: 'varchar', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  uniqueSinId?: string;

  @property({
    type: 'number',
    // precision: 10,
    // scale: 0,
    generated: 0,
    mysql: { columnName: 'user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  userId?: number;
  @hasMany(() => CustomerRelatives, { keyTo: 'customer_id' })
  customerRelativeRelation: CustomerRelatives[];

  // @hasMany(() => CustomerRelatives)
  // customerRelativeRelation: CustomerRelatives[];
  @hasMany(() => ContactInformation, {through: {model: () => CustomerContactInfo, keyFrom: 'customer_id', keyTo: 'contact_id'}})
  contactInformations: ContactInformation[];

  @hasMany(() => CustomerPlanOptionsValues, {keyTo: 'customer_id'})
  customerPlanOptionsValues: CustomerPlanOptionsValues[];
  @hasMany(() => CustomerPlans, { keyTo: 'customer_id' }) customerPlans: CustomerPlans[];

  @hasOne(() => CustomerSignup, { keyTo: 'customer_id' })
  customerSignup: CustomerSignup;
  // @hasMany(() => ContactInformation, { through: { model: () => CustomerContactInfo, keyFrom: 'customer_id', keyTo: 'contact_id' } })
  // contactInformations: ContactInformation[];
  // @hasMany(() => InsurancePlans, { through: { model: () => CustomerPlans, keyFrom: 'customer_id', keyTo: 'plan_id' } })
  // subscriptionPlans: InsurancePlans[];
  // // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
