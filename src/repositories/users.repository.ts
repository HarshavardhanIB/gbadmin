import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, repository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { Customer, Users, UsersRelations } from '../models';
import { CustomerRepository } from './customer.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  public readonly customer: HasOneRepositoryFactory<Customer, typeof Users.prototype.id>;
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
    @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(Users, dataSource);
    this.customer = this.createHasOneRepositoryFactoryFor('customer', customerRepositoryGetter);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
