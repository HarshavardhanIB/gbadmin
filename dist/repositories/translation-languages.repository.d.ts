import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { TranslationLanguages, TranslationLanguagesRelations } from '../models';
export declare class TranslationLanguagesRepository extends DefaultCrudRepository<TranslationLanguages, typeof TranslationLanguages.prototype.id, TranslationLanguagesRelations> {
    constructor(dataSource: GbadminDataSource);
}
