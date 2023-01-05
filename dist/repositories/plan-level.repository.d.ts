import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { PlanLevel, PlanLevelRelations, InsurancePlans } from '../models';
import { InsurancePlansRepository } from './insurance-plans.repository';
export declare class PlanLevelRepository extends DefaultCrudRepository<PlanLevel, typeof PlanLevel.prototype.id, PlanLevelRelations> {
    protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>;
    readonly plans: HasManyRepositoryFactory<InsurancePlans, typeof PlanLevel.prototype.id>;
    constructor(dataSource: GbadminDataSource, insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>);
}
