import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CustomerPlans, CustomerPlansRelations } from '../models';

export class CustomerPlansRepository extends DefaultCrudRepository<
  CustomerPlans,
  typeof CustomerPlans.prototype.id,
  CustomerPlansRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(CustomerPlans, dataSource);
  }
}
