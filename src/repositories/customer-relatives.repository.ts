import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CustomerRelatives, CustomerRelativesRelations, Customer } from '../models';
import { CustomerRepository } from './customer.repository';

export class CustomerRelativesRepository extends DefaultCrudRepository<
  CustomerRelatives,
  typeof CustomerRelatives.prototype.id,
  CustomerRelativesRelations
> {
  public readonly customer: BelongsToAccessor<Customer, typeof CustomerRelatives.prototype.id>;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(CustomerRelatives, dataSource);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
