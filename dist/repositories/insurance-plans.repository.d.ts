import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { InsurancePlans, InsurancePlansRelations, PlansAvailability } from '../models';
import { PlansAvailabilityRepository } from './plans-availability.repository';
export declare class InsurancePlansRepository extends DefaultCrudRepository<InsurancePlans, typeof InsurancePlans.prototype.id, InsurancePlansRelations> {
    protected plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>;
    readonly stateTaxDetails: HasManyRepositoryFactory<PlansAvailability, typeof InsurancePlans.prototype.id>;
    constructor(dataSource: GbadminDataSource, plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>);
}
