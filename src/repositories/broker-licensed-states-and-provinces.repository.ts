import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {BrokerLicensedStatesAndProvinces, BrokerLicensedStatesAndProvincesRelations, StatesAndProvinces} from '../models';
import {StatesAndProvincesRepository} from './states-and-provinces.repository';

export class BrokerLicensedStatesAndProvincesRepository extends DefaultCrudRepository<
  BrokerLicensedStatesAndProvinces,
  typeof BrokerLicensedStatesAndProvinces.prototype.id,
  BrokerLicensedStatesAndProvincesRelations
> {

  public readonly stateFullDetails: BelongsToAccessor<StatesAndProvinces, typeof BrokerLicensedStatesAndProvinces.prototype.id>;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource, @repository.getter('StatesAndProvincesRepository') protected statesAndProvincesRepositoryGetter: Getter<StatesAndProvincesRepository>,
  ) {
    super(BrokerLicensedStatesAndProvinces, dataSource);
    this.stateFullDetails = this.createBelongsToAccessorFor('stateFullDetails', statesAndProvincesRepositoryGetter,);
    this.registerInclusionResolver('stateFullDetails', this.stateFullDetails.inclusionResolver);
  }
}
