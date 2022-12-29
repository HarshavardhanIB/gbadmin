import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { SignupForms, SignupFormsRelations, BrokerSignupformsPlanlevels, Customer, CustomerSignup } from '../models';
import { BrokerSignupformsPlanlevelsRepository } from './broker-signupforms-planlevels.repository';
import { CustomerSignupRepository } from './customer-signup.repository';
import { CustomerRepository } from './customer.repository';
export declare class SignupFormsRepository extends DefaultCrudRepository<SignupForms, typeof SignupForms.prototype.id, SignupFormsRelations> {
    protected brokerSignupformsPlanlevelsRepositoryGetter: Getter<BrokerSignupformsPlanlevelsRepository>;
    protected customerSignupRepositoryGetter: Getter<CustomerSignupRepository>;
    protected customerRepositoryGetter: Getter<CustomerRepository>;
    readonly signupFormPlanLevels: HasManyRepositoryFactory<BrokerSignupformsPlanlevels, typeof SignupForms.prototype.id>;
    readonly customers: HasManyThroughRepositoryFactory<Customer, typeof Customer.prototype.id, CustomerSignup, typeof SignupForms.prototype.id>;
    constructor(dataSource: GbadminDataSource, brokerSignupformsPlanlevelsRepositoryGetter: Getter<BrokerSignupformsPlanlevelsRepository>, customerSignupRepositoryGetter: Getter<CustomerSignupRepository>, customerRepositoryGetter: Getter<CustomerRepository>);
}
