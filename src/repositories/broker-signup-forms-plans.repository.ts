import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {BrokerSignupFormsPlans, BrokerSignupFormsPlansRelations} from '../models';

export class BrokerSignupFormsPlansRepository extends DefaultCrudRepository<
  BrokerSignupFormsPlans,
  typeof BrokerSignupFormsPlans.prototype.id,
  BrokerSignupFormsPlansRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(BrokerSignupFormsPlans, dataSource);
  }
}
