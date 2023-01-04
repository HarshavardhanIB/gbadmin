import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { SignupForms, SignupFormsRelations, Customer, CustomerSignup, SignupFormsPlanLevelMapping, Broker} from '../models';
import { SignupFormsPlanLevelMappingRepository } from './signup-forms-plan-level-mapping.repository';
import { CustomerSignupRepository } from './customer-signup.repository';
import { CustomerRepository } from './customer.repository';
import {BrokerRepository} from './broker.repository';

export class SignupFormsRepository extends DefaultCrudRepository<
  SignupForms,
  typeof SignupForms.prototype.id,
  SignupFormsRelations
> {

  public readonly customers: HasManyThroughRepositoryFactory<Customer, typeof Customer.prototype.id,
    CustomerSignup,
    typeof SignupForms.prototype.id
  >;

  public readonly signupFormsPlanLevelMappings: HasManyRepositoryFactory<SignupFormsPlanLevelMapping, typeof SignupForms.prototype.id>;

  public readonly broker: BelongsToAccessor<Broker, typeof SignupForms.prototype.id>;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
    @repository.getter('SignupFormsPlanLevelMappingRepository')
    protected SignupFormsPlanLevelMappingRepositoryGetter: Getter<SignupFormsPlanLevelMappingRepository>,
    @repository.getter('CustomerSignupRepository')
    protected customerSignupRepositoryGetter: Getter<CustomerSignupRepository>,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>,
    @repository.getter('SignupFormsPlanLevelMappingRepository')
    protected signupFormsPlanLevelMappingRepositoryGetter: Getter<SignupFormsPlanLevelMappingRepository>, @repository.getter('BrokerRepository') protected brokerRepositoryGetter: Getter<BrokerRepository>,
  ) {
    super(SignupForms, dataSource);
    this.broker = this.createBelongsToAccessorFor('broker', brokerRepositoryGetter,);
    this.registerInclusionResolver('broker', this.broker.inclusionResolver);
    this.signupFormsPlanLevelMappings = this.createHasManyRepositoryFactoryFor('signupFormsPlanLevelMappings', signupFormsPlanLevelMappingRepositoryGetter,);
    this.registerInclusionResolver('signupFormsPlanLevelMappings', this.signupFormsPlanLevelMappings.inclusionResolver);
    this.customers = this.createHasManyThroughRepositoryFactoryFor('customers', customerRepositoryGetter, customerSignupRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
