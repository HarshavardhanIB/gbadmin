import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {SignupForms, SignupFormsRelations, BrokerSignupformsPlanlevels, Customer, CustomerSignup} from '../models';
import {BrokerSignupformsPlanlevelsRepository} from './broker-signupforms-planlevels.repository';
import {CustomerSignupRepository} from './customer-signup.repository';
import {CustomerRepository} from './customer.repository';

export class SignupFormsRepository extends DefaultCrudRepository<
  SignupForms,
  typeof SignupForms.prototype.id,
  SignupFormsRelations
> {

  public readonly signupFormPlanLevels: HasManyRepositoryFactory<BrokerSignupformsPlanlevels, typeof SignupForms.prototype.id>;

  public readonly customers: HasManyThroughRepositoryFactory<Customer, typeof Customer.prototype.id,
          CustomerSignup,
          typeof SignupForms.prototype.id
        >;

  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource, @repository.getter('BrokerSignupformsPlanlevelsRepository') protected brokerSignupformsPlanlevelsRepositoryGetter: Getter<BrokerSignupformsPlanlevelsRepository>, @repository.getter('CustomerSignupRepository') protected customerSignupRepositoryGetter: Getter<CustomerSignupRepository>, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(SignupForms, dataSource);
    this.customers = this.createHasManyThroughRepositoryFactoryFor('customers', customerRepositoryGetter, customerSignupRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
    this.signupFormPlanLevels = this.createHasManyRepositoryFactoryFor('signupFormPlanLevels', brokerSignupformsPlanlevelsRepositoryGetter,);
    this.registerInclusionResolver('signupFormPlanLevels', this.signupFormPlanLevels.inclusionResolver);
  }
}
