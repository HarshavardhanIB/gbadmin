import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {LanguageTokens, LanguageTokensRelations, TranslationLanguages} from '../models';
import {TranslationLanguagesRepository} from './translation-languages.repository';

export class LanguageTokensRepository extends DefaultCrudRepository<
  LanguageTokens,
  typeof LanguageTokens.prototype.id,
  LanguageTokensRelations
> {

  public readonly translationLanguages: BelongsToAccessor<TranslationLanguages, typeof LanguageTokens.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('TranslationLanguagesRepository') protected translationLanguagesRepositoryGetter: Getter<TranslationLanguagesRepository>,
  ) {
    super(LanguageTokens, dataSource);
    this.translationLanguages = this.createBelongsToAccessorFor('translationLanguages', translationLanguagesRepositoryGetter,);
    this.registerInclusionResolver('translationLanguages', this.translationLanguages.inclusionResolver);
  }
}
