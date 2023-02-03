import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { TranslationLanguages, TranslationLanguagesRelations, LanguageTokens } from '../models';
import { LanguageTokensRepository } from './language-tokens.repository';
export declare class TranslationLanguagesRepository extends DefaultCrudRepository<TranslationLanguages, typeof TranslationLanguages.prototype.id, TranslationLanguagesRelations> {
    protected languageTokensRepositoryGetter: Getter<LanguageTokensRepository>;
    readonly languageTokens: HasManyRepositoryFactory<LanguageTokens, typeof TranslationLanguages.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, languageTokensRepositoryGetter: Getter<LanguageTokensRepository>);
}
