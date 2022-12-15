import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CustomerSignup, CustomerSignupRelations } from '../models';

export class CustomerSignupRepository extends DefaultCrudRepository<
  CustomerSignup,
  typeof CustomerSignup.prototype.id,
  CustomerSignupRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(CustomerSignup, dataSource);
  }
}
