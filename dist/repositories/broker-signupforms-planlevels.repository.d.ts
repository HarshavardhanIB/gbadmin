import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { BrokerSignupformsPlanlevels, BrokerSignupformsPlanlevelsRelations, PlanLevel } from '../models';
import { PlanLevelRepository } from './plan-level.repository';
export declare class BrokerSignupformsPlanlevelsRepository extends DefaultCrudRepository<BrokerSignupformsPlanlevels, typeof BrokerSignupformsPlanlevels.prototype.id, BrokerSignupformsPlanlevelsRelations> {
    protected planLevelRepositoryGetter: Getter<PlanLevelRepository>;
    readonly planLevels: BelongsToAccessor<PlanLevel, typeof BrokerSignupformsPlanlevels.prototype.id>;
    constructor(dataSource: GbadminDataSource, planLevelRepositoryGetter: Getter<PlanLevelRepository>);
}
