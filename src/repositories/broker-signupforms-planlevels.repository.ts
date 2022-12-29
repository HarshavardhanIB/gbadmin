import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {BrokerSignupformsPlanlevels, BrokerSignupformsPlanlevelsRelations, PlanLevel} from '../models';
import {PlanLevelRepository} from './plan-level.repository';

export class BrokerSignupformsPlanlevelsRepository extends DefaultCrudRepository<
  BrokerSignupformsPlanlevels,
  typeof BrokerSignupformsPlanlevels.prototype.id,
  BrokerSignupformsPlanlevelsRelations
> {

  public readonly planLevels: BelongsToAccessor<PlanLevel, typeof BrokerSignupformsPlanlevels.prototype.id>;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource, @repository.getter('PlanLevelRepository') protected planLevelRepositoryGetter: Getter<PlanLevelRepository>,
  ) {
    super(BrokerSignupformsPlanlevels, dataSource);
    this.planLevels = this.createBelongsToAccessorFor('planLevels', planLevelRepositoryGetter,);
    this.registerInclusionResolver('planLevels', this.planLevels.inclusionResolver);
  }
}
