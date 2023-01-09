import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, mysql: { schema: 'gbadmin', table: 'translation_languages' } }
})
export class TranslationLanguages extends Entity {
  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'description', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
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
    type: 'boolean',
    precision: 1,
    generated: 0,
    mysql: { columnName: 'is_default', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
  })
  isDefault?: boolean;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  name?: string;

  @property({
    type: 'string',
    length: 5,
    generated: 0,
    mysql: { columnName: 'slug', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  slug?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TranslationLanguages>) {
    super(data);
  }
}

export interface TranslationLanguagesRelations {
  // describe navigational properties here
}

export type TranslationLanguagesWithRelations = TranslationLanguages & TranslationLanguagesRelations;
