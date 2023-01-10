import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { LanguageTokens, LanguageTokensRelations } from '../models';
export declare class LanguageTokensRepository extends DefaultCrudRepository<LanguageTokens, typeof LanguageTokens.prototype.id, LanguageTokensRelations> {
    constructor(dataSource: GbadminDataSource);
}
