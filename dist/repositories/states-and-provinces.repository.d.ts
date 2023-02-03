import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, BelongsToAccessor } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { StatesAndProvinces, StatesAndProvincesRelations, PlansAvailability, InsurancePlans, Country } from '../models';
import { PlansAvailabilityRepository } from './plans-availability.repository';
import { InsurancePlansRepository } from './insurance-plans.repository';
import { CountryRepository } from './country.repository';
export declare class StatesAndProvincesRepository extends DefaultCrudRepository<StatesAndProvinces, typeof StatesAndProvinces.prototype.id, StatesAndProvincesRelations> {
    protected plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>;
    protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>;
    protected countryRepositoryGetter: Getter<CountryRepository>;
    readonly planAvailability: HasManyRepositoryFactory<PlansAvailability, typeof StatesAndProvinces.prototype.id>;
    readonly insurancePlans: HasManyThroughRepositoryFactory<InsurancePlans, typeof InsurancePlans.prototype.id, PlansAvailability, typeof StatesAndProvinces.prototype.id>;
    readonly country: BelongsToAccessor<Country, typeof StatesAndProvinces.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>, insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>, countryRepositoryGetter: Getter<CountryRepository>);
}
