import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {InsurancePackages, InsurancePackagesRelations, InsurancePlans, PlanLevel} from '../models';
import {InsurancePlansRepository} from './insurance-plans.repository';
import {PlanLevelRepository} from './plan-level.repository';

export class InsurancePackagesRepository extends DefaultCrudRepository<
  InsurancePackages,
  typeof InsurancePackages.prototype.id,
  InsurancePackagesRelations
> {

  public readonly plans: HasManyRepositoryFactory<InsurancePlans, typeof InsurancePackages.prototype.id>;

  public readonly planGroups: HasManyThroughRepositoryFactory<PlanLevel, typeof PlanLevel.prototype.id,
          InsurancePlans,
          typeof InsurancePackages.prototype.id
        >;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('InsurancePlansRepository') protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>, @repository.getter('PlanLevelRepository') protected planLevelRepositoryGetter: Getter<PlanLevelRepository>,
  ) {
    super(InsurancePackages, dataSource);
    this.planGroups = this.createHasManyThroughRepositoryFactoryFor('planGroups', planLevelRepositoryGetter, insurancePlansRepositoryGetter,);
    this.registerInclusionResolver('planGroups', this.planGroups.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', insurancePlansRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
  }
}
