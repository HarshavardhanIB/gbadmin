import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { SignupFormsPlanLevelMapping, SignupFormsPlanLevelMappingRelations, PlanLevel } from '../models';
import { PlanLevelRepository } from './plan-level.repository';
export declare class SignupFormsPlanLevelMappingRepository extends DefaultCrudRepository<SignupFormsPlanLevelMapping, typeof SignupFormsPlanLevelMapping.prototype.id, SignupFormsPlanLevelMappingRelations> {
    protected planLevelRepositoryGetter: Getter<PlanLevelRepository>;
    readonly planLevels: BelongsToAccessor<PlanLevel, typeof SignupFormsPlanLevelMapping.prototype.id>;
    constructor(dataSource: GbadminDataSource, planLevelRepositoryGetter: Getter<PlanLevelRepository>);
}
