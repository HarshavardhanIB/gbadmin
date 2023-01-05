import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {InsurancePlans, InsurancePlansRelations, PlansAvailability} from '../models';
import {PlansAvailabilityRepository} from './plans-availability.repository';

export class InsurancePlansRepository extends DefaultCrudRepository<
  InsurancePlans,
  typeof InsurancePlans.prototype.id,
  InsurancePlansRelations
> {

  public readonly stateTaxDetails: HasManyRepositoryFactory<PlansAvailability, typeof InsurancePlans.prototype.id>;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource, @repository.getter('PlansAvailabilityRepository') protected plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>,
  ) {
    super(InsurancePlans, dataSource);
    this.stateTaxDetails = this.createHasManyRepositoryFactoryFor('stateTaxDetails', plansAvailabilityRepositoryGetter,);
    this.registerInclusionResolver('stateTaxDetails', this.stateTaxDetails.inclusionResolver);
  }
}
