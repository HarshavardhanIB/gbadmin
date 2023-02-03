import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { SignupFormsPlanLevelMapping, SignupFormsPlanLevelMappingRelations, PlanLevel } from '../models';
import { PlanLevelRepository } from './plan-level.repository';

export class SignupFormsPlanLevelMappingRepository extends DefaultCrudRepository<
  SignupFormsPlanLevelMapping,
  typeof SignupFormsPlanLevelMapping.prototype.id,
  SignupFormsPlanLevelMappingRelations
> {

  public readonly planLevels: BelongsToAccessor<PlanLevel, typeof SignupFormsPlanLevelMapping.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource,
    @repository.getter('PlanLevelRepository') protected planLevelRepositoryGetter: Getter<PlanLevelRepository>,
  ) {
    super(SignupFormsPlanLevelMapping, dataSource);
    this.planLevels = this.createBelongsToAccessorFor('planLevels', planLevelRepositoryGetter,);
    this.registerInclusionResolver('planLevels', this.planLevels.inclusionResolver);
  }
}
