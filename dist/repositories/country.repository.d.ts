import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { Country, CountryRelations, StatesAndProvinces } from '../models';
import { StatesAndProvincesRepository } from './states-and-provinces.repository';
export declare class CountryRepository extends DefaultCrudRepository<Country, typeof Country.prototype.id, CountryRelations> {
    protected statesAndProvincesRepositoryGetter: Getter<StatesAndProvincesRepository>;
    readonly statesAndProvinces: HasManyRepositoryFactory<StatesAndProvinces, typeof Country.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, statesAndProvincesRepositoryGetter: Getter<StatesAndProvincesRepository>);
}
