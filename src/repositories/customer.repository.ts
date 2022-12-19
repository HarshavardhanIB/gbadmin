import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { Customer, CustomerRelations, Users, CustomerRelatives, CustomerPlans, CustomerSignup } from '../models';
import { UsersRepository } from './users.repository';
import { CustomerRelativesRepository } from './customer-relatives.repository';
import { CustomerPlansRepository } from './customer-plans.repository';
import { CustomerSignupRepository } from './customer-signup.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {
  public readonly user: BelongsToAccessor<Users, typeof Customer.prototype.id>;

  public readonly customerRelativeRelation: HasManyRepositoryFactory<CustomerRelatives, typeof Customer.prototype.id>;
  public readonly customerPlans: HasManyRepositoryFactory<CustomerPlans, typeof Customer.prototype.id>;
  public readonly customerSignup: HasOneRepositoryFactory<CustomerSignup, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
    @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('CustomerRelativesRepository') protected customerRelativesRepositoryGetter: Getter<CustomerRelativesRepository>, @repository.getter('CustomerPlansRepository') protected customerPlansRepositoryGetter: Getter<CustomerPlansRepository>, @repository.getter('CustomerSignupRepository') protected customerSignupRepositoryGetter: Getter<CustomerSignupRepository>,
  ) {
    super(Customer, dataSource);
    this.customerSignup = this.createHasOneRepositoryFactoryFor('customerSignup', customerSignupRepositoryGetter);
    this.registerInclusionResolver('customerSignup', this.customerSignup.inclusionResolver);
    this.customerPlans = this.createHasManyRepositoryFactoryFor('customerPlans', customerPlansRepositoryGetter,);
    this.registerInclusionResolver('customerPlans', this.customerPlans.inclusionResolver);
    this.customerRelativeRelation = this.createHasManyRepositoryFactoryFor('customerRelativeRelation', customerRelativesRepositoryGetter,);
    this.registerInclusionResolver('customerRelativeRelation', this.customerRelativeRelation.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', usersRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }

}
