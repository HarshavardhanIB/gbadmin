import { Entity, hasMany, model, property } from '@loopback/repository';
import { InsurancePlans } from './insurance-plans.model';
import { PlanLevel } from './plan-level.model';

@model({
  settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'insurance_packages' } }
})
export class InsurancePackages extends Entity {
  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'allow_multiple', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  allowMultiple?: boolean;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'apply_filters', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  applyFilters?: boolean;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'description', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  description?: string;

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
    length: 255,
    generated: 0,
    mysql: { columnName: 'logo', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  logo?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  name?: string;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'opt_in', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  optIn?: boolean;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'ordering', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  ordering?: number;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  published?: boolean;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'required_package', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0 },
  })
  requiredPackage: number;
  @hasMany(() => PlanLevel, { through: { model: () => InsurancePlans, keyFrom: 'package_id', keyTo: 'plan_level' } })
  planGroups: PlanLevel[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InsurancePackages>) {
    super(data);
  }
}

export interface InsurancePackagesRelations {
  // describe navigational properties here
}

export type InsurancePackagesWithRelations = InsurancePackages & InsurancePackagesRelations;
