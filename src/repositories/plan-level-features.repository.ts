import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {PlanFeatures, PlanLevelFeatures, PlanLevelFeaturesRelations} from '../models';
import {PlanFeaturesRepository} from './plan-features.repository';

export class PlanLevelFeaturesRepository extends DefaultCrudRepository<
  PlanLevelFeatures,
  typeof PlanLevelFeatures.prototype.id,
  PlanLevelFeaturesRelations
> {

  public readonly planFeatures: HasOneRepositoryFactory<PlanFeatures, typeof PlanLevelFeatures.prototype.id>;

  public readonly feature: BelongsToAccessor<PlanFeatures, typeof PlanLevelFeatures.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('PlanFeaturesRepository') protected planFeaturesRepositoryGetter: Getter<PlanFeaturesRepository>,
  ) {
    super(PlanLevelFeatures, dataSource);
    this.feature = this.createBelongsToAccessorFor('feature', planFeaturesRepositoryGetter,);
    this.registerInclusionResolver('feature', this.feature.inclusionResolver);

  }
}
