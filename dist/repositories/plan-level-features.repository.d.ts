import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { PlanFeatures, PlanLevelFeatures, PlanLevelFeaturesRelations } from '../models';
import { PlanFeaturesRepository } from './plan-features.repository';
export declare class PlanLevelFeaturesRepository extends DefaultCrudRepository<PlanLevelFeatures, typeof PlanLevelFeatures.prototype.id, PlanLevelFeaturesRelations> {
    protected planFeaturesRepositoryGetter: Getter<PlanFeaturesRepository>;
    readonly planFeatures: HasOneRepositoryFactory<PlanFeatures, typeof PlanLevelFeatures.prototype.id>;
    readonly feature: BelongsToAccessor<PlanFeatures, typeof PlanLevelFeatures.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, planFeaturesRepositoryGetter: Getter<PlanFeaturesRepository>);
}
