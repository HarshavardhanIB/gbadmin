import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {StatesAndProvinces, StatesAndProvincesRelations, PlansAvailability} from '../models';
import {PlansAvailabilityRepository} from './plans-availability.repository';

export class StatesAndProvincesRepository extends DefaultCrudRepository<
  StatesAndProvinces,
  typeof StatesAndProvinces.prototype.id,
  StatesAndProvincesRelations
> {

  public readonly planAvailability: HasManyRepositoryFactory<PlansAvailability, typeof StatesAndProvinces.prototype.id>;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource, @repository.getter('PlansAvailabilityRepository') protected plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>,
  ) {
    super(StatesAndProvinces, dataSource);
    this.planAvailability = this.createHasManyRepositoryFactoryFor('planAvailability', plansAvailabilityRepositoryGetter,);
    this.registerInclusionResolver('planAvailability', this.planAvailability.inclusionResolver);
  }
}
