import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'signup_forms' } }
})
export class SignupForms extends Entity {
  @property({
    type: 'string',
    length: 1000,
    generated: 0,
    mysql: { columnName: 'alias', dataType: 'varchar', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  alias?: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0 },
  })
  brokerId: number;

  @property({
    type: 'string',
    length: 65535,
    generated: 0,
    mysql: { columnName: 'description', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
    length: 9,
    generated: 0,
    mysql: { columnName: 'form_type', dataType: 'enum', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  formType: string;

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
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'inelligibility_period', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  inelligibilityPeriod?: number;

  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'is_demo_form', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  isDemoForm: boolean;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'keywords', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  keywords?: string;

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
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  name?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: { columnName: 'not_after', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  notAfter?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: { columnName: 'not_before', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  notBefore?: string;

  @property({
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'published', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  published?: boolean;

  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'require_dental_health_coverage', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  requireDentalHealthCoverage: boolean;

  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'require_spouse_email', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  requireSpouseEmail: boolean;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: { columnName: 'title', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  title?: string;

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
    mysql: { columnName: 'use_pad_payment_method', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  usePadPaymentMethod: boolean;

  @property({
    type: 'boolean',
    required: true,
    precision: 1,
    generated: 0,
    mysql: { columnName: 'warn_required_dependant_medical_exam', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N', generated: 0 },
  })
  warnRequiredDependantMedicalExam: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SignupForms>) {
    super(data);
  }
}

export interface SignupFormsRelations {
  // describe navigational properties here
}

export type SignupFormsWithRelations = SignupForms & SignupFormsRelations;
