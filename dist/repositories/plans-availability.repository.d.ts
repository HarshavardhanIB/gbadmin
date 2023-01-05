import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { PlansAvailability, PlansAvailabilityRelations, StatesAndProvinces, InsurancePlans } from '../models';
import { StatesAndProvincesRepository } from './states-and-provinces.repository';
import { InsurancePlansRepository } from './insurance-plans.repository';
export declare class PlansAvailabilityRepository extends DefaultCrudRepository<PlansAvailability, typeof PlansAvailability.prototype.id, PlansAvailabilityRelations> {
    protected statesAndProvincesRepositoryGetter: Getter<StatesAndProvincesRepository>;
    protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>;
    readonly state: BelongsToAccessor<StatesAndProvinces, typeof PlansAvailability.prototype.id>;
    readonly plan: BelongsToAccessor<InsurancePlans, typeof PlansAvailability.prototype.id>;
    constructor(dataSource: GbadminDataSource, statesAndProvincesRepositoryGetter: Getter<StatesAndProvincesRepository>, insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>);
}
