import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'gbadmin', table: 'insurance_plans'}}
})
export class InsurancePlans extends Entity {
  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'code', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  code?: string;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: {columnName: 'corporate_plan', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0},
  })
  corporatePlan?: boolean;

  @property({
    type: 'number',
    precision: 12,
    generated: 0,
    mysql: {columnName: 'cost', dataType: 'float', dataLength: null, dataPrecision: 12, dataScale: null, nullable: 'Y', generated: 0},
  })
  cost?: number;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'description', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  description?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'frq_monthly', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  frqMonthly?: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: {columnName: 'frq_yearly', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  frqYearly?: string;

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
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'insurance_company_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  insuranceCompanyId?: number;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: {columnName: 'is_monthly_cost', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0},
  })
  isMonthlyCost?: boolean;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'logo', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  logo?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'max_age', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  maxAge?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'min_age', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  minAge?: number;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  name?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'ordering', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  ordering?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'package_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  packageId?: number;

  @property({
    type: 'string',
    length: 19,
    generated: 0,
    mysql: {columnName: 'plan_coverage', dataType: 'enum', dataLength: 19, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  planCoverage?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'plan_level', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  planLevel?: number;

  @property({
    type: 'boolean',
    precision: 2,
    generated: 0,
    mysql: {columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 2, dataScale: null, nullable: 'Y', generated: 0},
  })
  published?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InsurancePlans>) {
    super(data);
  }
}

export interface InsurancePlansRelations {
  // describe navigational properties here
}

export type InsurancePlansWithRelations = InsurancePlans & InsurancePlansRelations;
