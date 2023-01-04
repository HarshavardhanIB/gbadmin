import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { InsurancePackages, InsurancePackagesRelations, PlanLevel, InsurancePlans } from '../models';
import { InsurancePlansRepository } from './insurance-plans.repository';
import { PlanLevelRepository } from './plan-level.repository';
export declare class InsurancePackagesRepository extends DefaultCrudRepository<InsurancePackages, typeof InsurancePackages.prototype.id, InsurancePackagesRelations> {
    protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>;
    protected planLevelRepositoryGetter: Getter<PlanLevelRepository>;
    readonly planGroups: HasManyThroughRepositoryFactory<PlanLevel, typeof PlanLevel.prototype.id, InsurancePlans, typeof InsurancePackages.prototype.id>;
    constructor(dataSource: GbadminDataSource, insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>, planLevelRepositoryGetter: Getter<PlanLevelRepository>);
}
