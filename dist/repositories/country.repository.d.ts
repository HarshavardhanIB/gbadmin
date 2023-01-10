import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { Country, CountryRelations } from '../models';
export declare class CountryRepository extends DefaultCrudRepository<Country, typeof Country.prototype.id, CountryRelations> {
    constructor(dataSource: GbadminDataSource);
}
