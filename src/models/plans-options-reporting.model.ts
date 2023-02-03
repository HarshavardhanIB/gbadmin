import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    foreignKeys: {
      fk_plan_options_reporting_insurance_packages_package_id: {
        name: 'fk_plan_options_reporting_insurance_packages_package_id',
        entity: 'InsurancePackages',
        entityKey: 'id',
        foreignKey: 'packageId',
      },
    },
    mysql: {schema: 'group_benefitz', table: 'plans_options_reporting'}
  }
})
export class PlansOptionsReporting extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;
  
  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'email', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  email?: string;



  @property({
    type: 'string',
    length: 35,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 35, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  name?: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'plan_level_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  planLevelId: number;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'reporting_data', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  reportingData?: string;

  @property({
    type: 'string',
    required: true,
    length: 20,
    generated: 0,
    mysql: { columnName: 'reporting_id', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  reportingId: string;

  @property({
    type: 'string',
    required: true,
    length: 15,
    generated: 0,
    mysql: { columnName: 'reporting_type', dataType: 'enum', dataLength: 15, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  reportingType: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'reporting_url', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  reportingUrl?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PlansOptionsReporting>) {
    super(data);
  }
}

export interface PlansOptionsReportingRelations {
  // describe navigational properties here
}

export type PlansOptionsReportingWithRelations = PlansOptionsReporting & PlansOptionsReportingRelations;
