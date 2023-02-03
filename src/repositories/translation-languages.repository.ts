import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {TranslationLanguages, TranslationLanguagesRelations, LanguageTokens} from '../models';
import {LanguageTokensRepository} from './language-tokens.repository';

export class TranslationLanguagesRepository extends DefaultCrudRepository<
  TranslationLanguages,
  typeof TranslationLanguages.prototype.id,
  TranslationLanguagesRelations
> {

  public readonly languageTokens: HasManyRepositoryFactory<LanguageTokens, typeof TranslationLanguages.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('LanguageTokensRepository') protected languageTokensRepositoryGetter: Getter<LanguageTokensRepository>,
  ) {
    super(TranslationLanguages, dataSource);
    this.languageTokens = this.createHasManyRepositoryFactoryFor('languageTokens', languageTokensRepositoryGetter,);
    this.registerInclusionResolver('languageTokens', this.languageTokens.inclusionResolver);
  }
}
