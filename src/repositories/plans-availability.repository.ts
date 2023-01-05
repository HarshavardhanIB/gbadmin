import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {PlansAvailability, PlansAvailabilityRelations, StatesAndProvinces, InsurancePlans} from '../models';
import {StatesAndProvincesRepository} from './states-and-provinces.repository';
import {InsurancePlansRepository} from './insurance-plans.repository';

export class PlansAvailabilityRepository extends DefaultCrudRepository<
  PlansAvailability,
  typeof PlansAvailability.prototype.id,
  PlansAvailabilityRelations
> {

  public readonly state: BelongsToAccessor<StatesAndProvinces, typeof PlansAvailability.prototype.id>;

  public readonly plan: BelongsToAccessor<InsurancePlans, typeof PlansAvailability.prototype.id>;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource, @repository.getter('StatesAndProvincesRepository') protected statesAndProvincesRepositoryGetter: Getter<StatesAndProvincesRepository>, @repository.getter('InsurancePlansRepository') protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>,
  ) {
    super(PlansAvailability, dataSource);
    this.plan = this.createBelongsToAccessorFor('plan', insurancePlansRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.state = this.createBelongsToAccessorFor('state', statesAndProvincesRepositoryGetter,);
    this.registerInclusionResolver('state', this.state.inclusionResolver);
  }
}
