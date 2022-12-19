import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {BrokerSignupformsPlanlevels, BrokerSignupformsPlanlevelsRelations} from '../models';

export class BrokerSignupformsPlanlevelsRepository extends DefaultCrudRepository<
  BrokerSignupformsPlanlevels,
  typeof BrokerSignupformsPlanlevels.prototype.id,
  BrokerSignupformsPlanlevelsRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(BrokerSignupformsPlanlevels, dataSource);
  }
}
