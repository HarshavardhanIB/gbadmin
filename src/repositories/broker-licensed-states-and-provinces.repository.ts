import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {BrokerLicensedStatesAndProvinces, BrokerLicensedStatesAndProvincesRelations} from '../models';

export class BrokerLicensedStatesAndProvincesRepository extends DefaultCrudRepository<
  BrokerLicensedStatesAndProvinces,
  typeof BrokerLicensedStatesAndProvinces.prototype.id,
  BrokerLicensedStatesAndProvincesRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(BrokerLicensedStatesAndProvinces, dataSource);
  }
}
