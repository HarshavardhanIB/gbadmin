import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {InsurancePackages, InsurancePackagesRelations, PlanLevel, InsurancePlans} from '../models';
import {InsurancePlansRepository} from './insurance-plans.repository';
import {PlanLevelRepository} from './plan-level.repository';

export class InsurancePackagesRepository extends DefaultCrudRepository<
  InsurancePackages,
  typeof InsurancePackages.prototype.id,
  InsurancePackagesRelations
> {

  public readonly planGroups: HasManyThroughRepositoryFactory<PlanLevel, typeof PlanLevel.prototype.id,
          InsurancePlans,
          typeof InsurancePackages.prototype.id
        >;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource, @repository.getter('InsurancePlansRepository') protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>, @repository.getter('PlanLevelRepository') protected planLevelRepositoryGetter: Getter<PlanLevelRepository>,
  ) {
    super(InsurancePackages, dataSource);
    this.planGroups = this.createHasManyThroughRepositoryFactoryFor('planGroups', planLevelRepositoryGetter, insurancePlansRepositoryGetter,);
    this.registerInclusionResolver('planGroups', this.planGroups.inclusionResolver);
  }
}
