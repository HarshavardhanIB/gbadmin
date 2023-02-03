import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { InsurancePlans, InsurancePlansOptions, InsurancePlansRelations, PlanLevel, PlanOptions, PlansAvailability } from '../models';
import { InsurancePlansOptionsRepository } from './insurance-plans-options.repository';
import { PlanLevelRepository } from './plan-level.repository';
import { PlanOptionsRepository } from './plan-options.repository';
import { PlansAvailabilityRepository } from './plans-availability.repository';
export declare class InsurancePlansRepository extends DefaultCrudRepository<InsurancePlans, typeof InsurancePlans.prototype.id, InsurancePlansRelations> {
    protected plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>;
    protected planLevelRepositoryGetter: Getter<PlanLevelRepository>;
    protected insurancePlansOptionsRepositoryGetter: Getter<InsurancePlansOptionsRepository>;
    protected planOptionsRepositoryGetter: Getter<PlanOptionsRepository>;
    readonly stateTaxDetails: HasManyRepositoryFactory<PlansAvailability, typeof InsurancePlans.prototype.id>;
    readonly planLevels: BelongsToAccessor<PlanLevel, typeof InsurancePlans.prototype.id>;
    readonly planOptions: HasManyThroughRepositoryFactory<PlanOptions, typeof PlanOptions.prototype.id, InsurancePlansOptions, typeof InsurancePlans.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>, planLevelRepositoryGetter: Getter<PlanLevelRepository>, insurancePlansOptionsRepositoryGetter: Getter<InsurancePlansOptionsRepository>, planOptionsRepositoryGetter: Getter<PlanOptionsRepository>);
}
