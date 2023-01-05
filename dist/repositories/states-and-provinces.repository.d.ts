import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { StatesAndProvinces, StatesAndProvincesRelations, PlansAvailability } from '../models';
import { PlansAvailabilityRepository } from './plans-availability.repository';
export declare class StatesAndProvincesRepository extends DefaultCrudRepository<StatesAndProvinces, typeof StatesAndProvinces.prototype.id, StatesAndProvincesRelations> {
    protected plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>;
    readonly planAvailability: HasManyRepositoryFactory<PlansAvailability, typeof StatesAndProvinces.prototype.id>;
    constructor(dataSource: GbadminDataSource, plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>);
}
