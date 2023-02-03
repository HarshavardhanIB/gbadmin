import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TranslationLanguages} from './translation-languages.model';

@model({
  settings: {
    idInjection: false,
    foreignKeys: {
      language_tokens_ibfk_1: {
        name: 'language_tokens_ibfk_1',
        entity: 'translationLanguages',
        entityKey: 'id',
        foreignKey: 'translationLanguageId',
      }
    },
    mysql: {schema: 'group_benefitz', table: 'language_tokens'}
  }
})
export class LanguageTokens extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 45,
    generated: 0,
    mysql: { columnName: 'category', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  category: string;

  @property({
    type: 'string',
    length: 45,
    generated: 0,
    mysql: { columnName: 'description', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  description?: string;

  @property({
    type: 'number',
    generated: true,
    id: true
  })
  id?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'item_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  itemId?: number;

  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: { columnName: 'key', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
  })
  key: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: { columnName: 'translation_language_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
  })
  translationLanguageId?: number;

  @property({
    type: 'string',
    length: 65535,
    generated: 0,
    mysql: { columnName: 'value', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
  })
  value?: string;

  @belongsTo(() => TranslationLanguages, {name: 'translationLanguages'})
  translation_language_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LanguageTokens>) {
    super(data);
  }
}

export interface LanguageTokensRelations {
  // describe navigational properties here
}

export type LanguageTokensWithRelations = LanguageTokens & LanguageTokensRelations;
