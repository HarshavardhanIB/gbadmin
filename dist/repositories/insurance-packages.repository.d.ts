import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { InsurancePackages, InsurancePackagesRelations, InsurancePlans, PlanLevel } from '../models';
import { InsurancePlansRepository } from './insurance-plans.repository';
import { PlanLevelRepository } from './plan-level.repository';
export declare class InsurancePackagesRepository extends DefaultCrudRepository<InsurancePackages, typeof InsurancePackages.prototype.id, InsurancePackagesRelations> {
    protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>;
    protected planLevelRepositoryGetter: Getter<PlanLevelRepository>;
    readonly plans: HasManyRepositoryFactory<InsurancePlans, typeof InsurancePackages.prototype.id>;
    readonly planGroups: HasManyThroughRepositoryFactory<PlanLevel, typeof PlanLevel.prototype.id, InsurancePlans, typeof InsurancePackages.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>, planLevelRepositoryGetter: Getter<PlanLevelRepository>);
}
