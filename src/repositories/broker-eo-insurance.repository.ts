import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {BrokerEoInsurance, BrokerEoInsuranceRelations} from '../models';

export class BrokerEoInsuranceRepository extends DefaultCrudRepository<
  BrokerEoInsurance,
  typeof BrokerEoInsurance.prototype.id,
  BrokerEoInsuranceRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(BrokerEoInsurance, dataSource);
  }
}
