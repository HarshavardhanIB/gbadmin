import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {StatesAndProvinces, StatesAndProvincesRelations, PlansAvailability, InsurancePlans, Country} from '../models';
import {PlansAvailabilityRepository} from './plans-availability.repository';
import {InsurancePlansRepository} from './insurance-plans.repository';
import {CountryRepository} from './country.repository';

export class StatesAndProvincesRepository extends DefaultCrudRepository<
  StatesAndProvinces,
  typeof StatesAndProvinces.prototype.id,
  StatesAndProvincesRelations
> {

  public readonly planAvailability: HasManyRepositoryFactory<PlansAvailability, typeof StatesAndProvinces.prototype.id>;

  public readonly insurancePlans: HasManyThroughRepositoryFactory<InsurancePlans, typeof InsurancePlans.prototype.id,
          PlansAvailability,
          typeof StatesAndProvinces.prototype.id
        >;

  public readonly country: BelongsToAccessor<Country, typeof StatesAndProvinces.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('PlansAvailabilityRepository') protected plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>, @repository.getter('InsurancePlansRepository') protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(StatesAndProvinces, dataSource);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
    this.registerInclusionResolver('country', this.country.inclusionResolver);
    this.insurancePlans = this.createHasManyThroughRepositoryFactoryFor('insurancePlans', insurancePlansRepositoryGetter, plansAvailabilityRepositoryGetter,);
    this.registerInclusionResolver('insurancePlans', this.insurancePlans.inclusionResolver);
    this.planAvailability = this.createHasManyRepositoryFactoryFor('planAvailability', plansAvailabilityRepositoryGetter,);
    this.registerInclusionResolver('planAvailability', this.planAvailability.inclusionResolver);
  }
}
