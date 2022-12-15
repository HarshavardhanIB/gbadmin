import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false, foreignKeys: {

      fk_customer_plans_customers_customer_id: {

        name: 'fk_customer_plans_customers_customer_id',

        entity: 'Customers',

        entityKey: 'id',

        foreignKey: 'customerId',

      }

    }, mysql: { table: 'customer_plans' }
  }
})
export class CustomerPlans extends Entity {
  @property({
    type: 'date',
    generated: 0,
    mysql: { columnName: 'activation_date', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  activationDate?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: { columnName: 'cancellation_date', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  cancellationDate?: string;

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
    precision: 12,
    generated: 0,
    mysql: { columnName: 'gst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  gst?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'gst_amount', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  gstAmount?: number;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'gst_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  gstCode?: string;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'gst_rate', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  gstRate?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'hst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  hst?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'hst_amount', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  hstAmount?: number;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'hst_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  hstCode?: string;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'hst_rate', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  hstRate?: number;

  @property({
    type: 'number',
    // precision: 10,
    // scale: 0,
    generated: 1,
    id: 1
    // mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'plan_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  planId?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'price', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  price?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'pst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  pst?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'pst_amount', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  pstAmount?: number;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'pst_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  pstCode?: string;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'pst_rate', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  pstRate?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'qst', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  qst?: number;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'qst_amount', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  qstAmount?: number;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'qst_code', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  qstCode?: string;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: { columnName: 'qst_rate', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0 },
  })
  qstRate?: number;

  @property({
    type: 'string',
    length: 7,
    generated: 0,
    mysql: { columnName: 'status', dataType: 'enum', dataLength: 7, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  status?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'subscription_id', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  subscriptionId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CustomerPlans>) {
    super(data);
  }
}

export interface CustomerPlansRelations {
  // describe navigational properties here
}

export type CustomerPlansWithRelations = CustomerPlans & CustomerPlansRelations;
