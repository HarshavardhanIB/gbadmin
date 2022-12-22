import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { Customer, CustomerRelations, Users, CustomerRelatives, CustomerPlans, CustomerSignup, ContactInformation, CustomerContactInfo, InsurancePlans } from '../models';
import { UsersRepository } from './users.repository';
import { CustomerRelativesRepository } from './customer-relatives.repository';
import { CustomerPlansRepository } from './customer-plans.repository';
import { CustomerSignupRepository } from './customer-signup.repository';
import { ContactInformationRepository } from './contact-information.repository';
import { CustomerContactInfoRepository } from './customer-contact-info.repository';
import { InsurancePlansRepository } from './insurance-plans.repository';
export declare class CustomerRepository extends DefaultCrudRepository<Customer, typeof Customer.prototype.id, CustomerRelations> {
    protected usersRepositoryGetter: Getter<UsersRepository>;
    protected customerRelativesRepositoryGetter: Getter<CustomerRelativesRepository>;
    protected customerPlansRepositoryGetter: Getter<CustomerPlansRepository>;
    protected customerSignupRepositoryGetter: Getter<CustomerSignupRepository>;
    protected contactInformationRepositoryGetter: Getter<ContactInformationRepository>;
    protected customerContactInfoRepositoryGetter: Getter<CustomerContactInfoRepository>;
    protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>;
    readonly user: BelongsToAccessor<Users, typeof Customer.prototype.id>;
    readonly customerRelativeRelation: HasManyRepositoryFactory<CustomerRelatives, typeof Customer.prototype.id>;
    readonly customerPlans: HasManyRepositoryFactory<CustomerPlans, typeof Customer.prototype.id>;
    readonly customerSignup: HasOneRepositoryFactory<CustomerSignup, typeof Customer.prototype.id>;
    readonly contactInformations: HasManyThroughRepositoryFactory<ContactInformation, typeof ContactInformation.prototype.id, CustomerContactInfo, typeof Customer.prototype.id>;
    readonly subscriptionPlans: HasManyThroughRepositoryFactory<InsurancePlans, typeof InsurancePlans.prototype.id, CustomerPlans, typeof Customer.prototype.id>;
    constructor(dataSource: GbadminDataSource, usersRepositoryGetter: Getter<UsersRepository>, customerRelativesRepositoryGetter: Getter<CustomerRelativesRepository>, customerPlansRepositoryGetter: Getter<CustomerPlansRepository>, customerSignupRepositoryGetter: Getter<CustomerSignupRepository>, contactInformationRepositoryGetter: Getter<ContactInformationRepository>, customerContactInfoRepositoryGetter: Getter<CustomerContactInfoRepository>, insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>);
}
