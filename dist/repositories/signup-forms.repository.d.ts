import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, BelongsToAccessor } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { SignupForms, SignupFormsRelations, Customer, CustomerSignup, SignupFormsPlanLevelMapping, Broker, BrokerSignupFormsPlans } from '../models';
import { SignupFormsPlanLevelMappingRepository } from './signup-forms-plan-level-mapping.repository';
import { CustomerSignupRepository } from './customer-signup.repository';
import { CustomerRepository } from './customer.repository';
import { BrokerRepository } from './broker.repository';
import { BrokerSignupFormsPlansRepository } from './broker-signup-forms-plans.repository';
export declare class SignupFormsRepository extends DefaultCrudRepository<SignupForms, typeof SignupForms.prototype.id, SignupFormsRelations> {
    protected SignupFormsPlanLevelMappingRepositoryGetter: Getter<SignupFormsPlanLevelMappingRepository>;
    protected customerSignupRepositoryGetter: Getter<CustomerSignupRepository>;
    protected customerRepositoryGetter: Getter<CustomerRepository>;
    protected signupFormsPlanLevelMappingRepositoryGetter: Getter<SignupFormsPlanLevelMappingRepository>;
    protected brokerRepositoryGetter: Getter<BrokerRepository>;
    protected brokerSignupFormsPlansRepositoryGetter: Getter<BrokerSignupFormsPlansRepository>;
    readonly customers: HasManyThroughRepositoryFactory<Customer, typeof Customer.prototype.id, CustomerSignup, typeof SignupForms.prototype.id>;
    readonly signupFormsPlanLevelMappings: HasManyRepositoryFactory<SignupFormsPlanLevelMapping, typeof SignupForms.prototype.id>;
    readonly broker: BelongsToAccessor<Broker, typeof SignupForms.prototype.id>;
    readonly brokerSignupFormsPlans: HasManyRepositoryFactory<BrokerSignupFormsPlans, typeof SignupForms.prototype.id>;
    constructor(dataSource: GbadminDataSource, SignupFormsPlanLevelMappingRepositoryGetter: Getter<SignupFormsPlanLevelMappingRepository>, customerSignupRepositoryGetter: Getter<CustomerSignupRepository>, customerRepositoryGetter: Getter<CustomerRepository>, signupFormsPlanLevelMappingRepositoryGetter: Getter<SignupFormsPlanLevelMappingRepository>, brokerRepositoryGetter: Getter<BrokerRepository>, brokerSignupFormsPlansRepositoryGetter: Getter<BrokerSignupFormsPlansRepository>);
}
