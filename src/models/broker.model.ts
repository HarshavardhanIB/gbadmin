import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'broker' } } })
export class Broker extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 11,
    generated: 0,
    mysql: { columnName: 'broker_type', dataType: 'enum', dataLength: 11, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  brokerType: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'contact_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  contactId?: number;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'deleted', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  deleted?: boolean;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'description', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  description?: string;

  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'discoverable', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  discoverable: boolean;

  @property({
    type: 'string',
    length: 35,
    generated: 0,
    mysql: { columnName: 'fusebill_corporate_customer_id', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  fusebillCorporateCustomerId?: string;

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
    length: 1000,
    generated: 0,
    mysql: { columnName: 'link', dataType: 'varchar', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  link?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'logo', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  logo?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  name?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'parent_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  parentId?: number;

  @property({
    type: 'date',
    generated: 0,
    mysql: { columnName: 'policy_start_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  policyStartDate?: string;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  published?: boolean;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'sales_tracking_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  salesTrackingCode?: string;

  @property({
    type: 'string',
    required: true,
    length: 35,
    generated: 0,
    mysql: { columnName: 'sales_tracking_type', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  salesTrackingType: string;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'settings_allow_group_benefits_wallet', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
  })
  settingsAllowGroupBenefitsWallet: number;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'settings_allow_invoice_payment_method', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
  })
  settingsAllowInvoicePaymentMethod: number;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'settings_enable_tiered_health_benefits', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
  })
  settingsEnableTieredHealthBenefits: number;

  @property({
    type: 'string',
    length: 8,
    generated: 0,
    mysql: { columnName: 'settings_health_spending_account', dataType: 'enum', dataLength: 8, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  settingsHealthSpendingAccount?: string;

  @property({
    type: 'string',
    length: 9,
    generated: 0,
    mysql: { columnName: 'settings_health_spending_allotment', dataType: 'enum', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  settingsHealthSpendingAllotment?: string;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'settings_rollover_employee_limit_next_year', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
  })
  settingsRolloverEmployeeLimitNextYear: number;

  @property({
    type: 'string',
    length: 19,
    generated: 0,
    mysql: { columnName: 'settings_rollover_unused_wallet_funds', dataType: 'enum', dataLength: 19, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  settingsRolloverUnusedWalletFunds?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'unique_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  uniqueId?: string;

  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'use_credit_card_payment_method', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  useCreditCardPaymentMethod: boolean;

  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'use_invoice_payment_method', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  useInvoicePaymentMethod: boolean;

  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'use_pad_payment_method', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  usePadPaymentMethod: boolean;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  userId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'wait_time', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  waitTime?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Broker>) {
    super(data);
  }
}

export interface BrokerRelations {
  // describe navigational properties here
}

export type BrokerWithRelations = Broker & BrokerRelations;
