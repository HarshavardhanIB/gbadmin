import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {BrokerAvailablePlanLevels, BrokerAvailablePlanLevelsRelations} from '../models';

export class BrokerAvailablePlanLevelsRepository extends DefaultCrudRepository<
  BrokerAvailablePlanLevels,
  typeof BrokerAvailablePlanLevels.prototype.id,
  BrokerAvailablePlanLevelsRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(BrokerAvailablePlanLevels, dataSource);
  }
}
