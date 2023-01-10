import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {LanguageTokens, LanguageTokensRelations} from '../models';

export class LanguageTokensRepository extends DefaultCrudRepository<
  LanguageTokens,
  typeof LanguageTokens.prototype.id,
  LanguageTokensRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(LanguageTokens, dataSource);
  }
}
