import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { SignupForms, SignupFormsRelations, Customer, CustomerSignup, SignupFormsPlanLevelMapping, Broker, } from '../models';
import { SignupFormsPlanLevelMappingRepository } from './signup-forms-plan-level-mapping.repository';
import { CustomerSignupRepository } from './customer-signup.repository';
import { CustomerRepository } from './customer.repository';
import {BrokerRepository} from './broker.repository';
//import {BrokerSignupFormsPlansRepository} from './broker-signup-forms-plans.repository';

export class SignupFormsRepository extends DefaultCrudRepository<
  SignupForms,
  typeof SignupForms.prototype.id,
  SignupFormsRelations
> {

  public readonly customers: HasManyThroughRepositoryFactory<Customer, typeof Customer.prototype.id,
    CustomerSignup,
    typeof SignupForms.prototype.id
  >;

  public readonly signupFormPlanLevels: HasManyRepositoryFactory<SignupFormsPlanLevelMapping, typeof SignupForms.prototype.id>;

  public readonly broker: BelongsToAccessor<Broker, typeof SignupForms.prototype.id>;

  // public readonly brokerSignupFormsPlans: HasManyRepositoryFactory<BrokerSignupFormsPlans, typeof SignupForms.prototype.id>;
  // public readonly signupFormPlanLevels: HasManyRepositoryFactory<SignupFormsPlanLevelMapping, typeof SignupForms.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource,
    @repository.getter('SignupFormsPlanLevelMappingRepository')
    protected SignupFormsPlanLevelMappingRepositoryGetter: Getter<SignupFormsPlanLevelMappingRepository>,
    @repository.getter('CustomerSignupRepository')
    protected customerSignupRepositoryGetter: Getter<CustomerSignupRepository>,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>,
    @repository.getter('SignupFormsPlanLevelMappingRepository')
    protected signupFormsPlanLevelMappingRepositoryGetter: Getter<SignupFormsPlanLevelMappingRepository>, @repository.getter('BrokerRepository') protected brokerRepositoryGetter: Getter<BrokerRepository>, 
    //@repository.getter('BrokerSignupFormsPlansRepository') protected brokerSignupFormsPlansRepositoryGetter: Getter<BrokerSignupFormsPlansRepository>,
  ) {
    super(SignupForms, dataSource);
    // this.brokerSignupFormsPlans = this.createHasManyRepositoryFactoryFor('brokerSignupFormsPlans', brokerSignupFormsPlansRepositoryGetter,);
    // this.registerInclusionResolver('brokerSignupFormsPlans', this.brokerSignupFormsPlans.inclusionResolver);

    // this.signupFormPlanLevels = this.createHasManyRepositoryFactoryFor('signupFormPlanLevels', signupFormsPlanLevelMappingRepositoryGetter,);
    // this.registerInclusionResolver('signupFormPlanLevels', this.signupFormPlanLevels.inclusionResolver);

    this.broker = this.createBelongsToAccessorFor('broker', brokerRepositoryGetter,);
    this.registerInclusionResolver('broker', this.broker.inclusionResolver);
    this.signupFormPlanLevels = this.createHasManyRepositoryFactoryFor('signupFormPlanLevels', signupFormsPlanLevelMappingRepositoryGetter,);
    this.registerInclusionResolver('signupFormPlanLevels', this.signupFormPlanLevels.inclusionResolver);
    this.customers = this.createHasManyThroughRepositoryFactoryFor('customers', customerRepositoryGetter, customerSignupRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
