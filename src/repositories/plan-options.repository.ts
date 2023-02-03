import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {PlanOptions, PlanOptionsRelations, PlanOptionsValues} from '../models';
import {PlanOptionsValuesRepository} from './plan-options-values.repository';

export class PlanOptionsRepository extends DefaultCrudRepository<
  PlanOptions,
  typeof PlanOptions.prototype.id,
  PlanOptionsRelations
> {

  public readonly planOptionsValues: HasManyRepositoryFactory<PlanOptionsValues, typeof PlanOptions.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('PlanOptionsValuesRepository') protected planOptionsValuesRepositoryGetter: Getter<PlanOptionsValuesRepository>,
  ) {
    super(PlanOptions, dataSource);
    this.planOptionsValues = this.createHasManyRepositoryFactoryFor('planOptionsValues', planOptionsValuesRepositoryGetter,);
    this.registerInclusionResolver('planOptionsValues', this.planOptionsValues.inclusionResolver);
  }
}
