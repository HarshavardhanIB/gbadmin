import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {PlanLevel, PlanLevelRelations, InsurancePlans} from '../models';
import {InsurancePlansRepository} from './insurance-plans.repository';

export class PlanLevelRepository extends DefaultCrudRepository<
  PlanLevel,
  typeof PlanLevel.prototype.id,
  PlanLevelRelations
> {

  public readonly plans: HasManyRepositoryFactory<InsurancePlans, typeof PlanLevel.prototype.id>;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource, @repository.getter('InsurancePlansRepository') protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>,
  ) {
    super(PlanLevel, dataSource);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', insurancePlansRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
  }
}
