import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {TranslationLanguages, TranslationLanguagesRelations} from '../models';

export class TranslationLanguagesRepository extends DefaultCrudRepository<
  TranslationLanguages,
  typeof TranslationLanguages.prototype.id,
  TranslationLanguagesRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(TranslationLanguages, dataSource);
  }
}
