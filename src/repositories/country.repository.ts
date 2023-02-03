import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {Country, CountryRelations, StatesAndProvinces} from '../models';
import {StatesAndProvincesRepository} from './states-and-provinces.repository';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {

  public readonly statesAndProvinces: HasManyRepositoryFactory<StatesAndProvinces, typeof Country.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('StatesAndProvincesRepository') protected statesAndProvincesRepositoryGetter: Getter<StatesAndProvincesRepository>,
  ) {
    super(Country, dataSource);
    this.statesAndProvinces = this.createHasManyRepositoryFactoryFor('statesAndProvinces', statesAndProvincesRepositoryGetter,);
    this.registerInclusionResolver('statesAndProvinces', this.statesAndProvinces.inclusionResolver);
  }
}
