import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { LanguageTokens, LanguageTokensRelations, TranslationLanguages } from '../models';
import { TranslationLanguagesRepository } from './translation-languages.repository';
export declare class LanguageTokensRepository extends DefaultCrudRepository<LanguageTokens, typeof LanguageTokens.prototype.id, LanguageTokensRelations> {
    protected translationLanguagesRepositoryGetter: Getter<TranslationLanguagesRepository>;
    readonly translationLanguages: BelongsToAccessor<TranslationLanguages, typeof LanguageTokens.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, translationLanguagesRepositoryGetter: Getter<TranslationLanguagesRepository>);
}
