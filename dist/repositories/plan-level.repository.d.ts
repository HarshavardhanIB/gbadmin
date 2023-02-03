import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { InsurancePlans, PlanLevel, PlanLevelRelations, GreenshieldPlanLevelMapping, PlanLevelFeatures, PlanFeatures, EquitablePlanLevelMapping } from '../models';
import { InsurancePlansRepository } from './insurance-plans.repository';
import { GreenshieldPlanLevelMappingRepository } from './greenshield-plan-level-mapping.repository';
import { PlanLevelFeaturesRepository } from './plan-level-features.repository';
import { PlanFeaturesRepository } from './plan-features.repository';
import { EquitablePlanLevelMappingRepository } from './equitable-plan-level-mapping.repository';
export declare class PlanLevelRepository extends DefaultCrudRepository<PlanLevel, typeof PlanLevel.prototype.id, PlanLevelRelations> {
    protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>;
    protected greenshieldPlanLevelMappingRepositoryGetter: Getter<GreenshieldPlanLevelMappingRepository>;
    protected planLevelFeaturesRepositoryGetter: Getter<PlanLevelFeaturesRepository>;
    protected planFeaturesRepositoryGetter: Getter<PlanFeaturesRepository>;
    protected equitablePlanLevelMappingRepositoryGetter: Getter<EquitablePlanLevelMappingRepository>;
    readonly plans: HasManyRepositoryFactory<InsurancePlans, typeof PlanLevel.prototype.id>;
    readonly greenshieldPackages: HasManyRepositoryFactory<GreenshieldPlanLevelMapping, typeof PlanLevel.prototype.id>;
    readonly planLevelFeatures: HasManyRepositoryFactory<PlanLevelFeatures, typeof PlanLevel.prototype.id>;
    readonly planFeatures: HasManyThroughRepositoryFactory<PlanFeatures, typeof PlanFeatures.prototype.id, PlanLevelFeatures, typeof PlanLevel.prototype.id>;
    readonly equitablePackages: HasManyRepositoryFactory<EquitablePlanLevelMapping, typeof PlanLevel.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>, greenshieldPlanLevelMappingRepositoryGetter: Getter<GreenshieldPlanLevelMappingRepository>, planLevelFeaturesRepositoryGetter: Getter<PlanLevelFeaturesRepository>, planFeaturesRepositoryGetter: Getter<PlanFeaturesRepository>, equitablePlanLevelMappingRepositoryGetter: Getter<EquitablePlanLevelMappingRepository>);
}
