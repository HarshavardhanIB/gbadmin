import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { Customer, CustomerRelations, Users, CustomerRelatives, CustomerPlans, CustomerSignup } from '../models';
import { UsersRepository } from './users.repository';
import { CustomerRelativesRepository } from './customer-relatives.repository';
import { CustomerPlansRepository } from './customer-plans.repository';
import { CustomerSignupRepository } from './customer-signup.repository';
import { ContactInformationRepository } from './contact-information.repository';
export declare class CustomerRepository extends DefaultCrudRepository<Customer, typeof Customer.prototype.id, CustomerRelations> {
    protected usersRepositoryGetter: Getter<UsersRepository>;
    protected customerRelativesRepositoryGetter: Getter<CustomerRelativesRepository>;
    protected customerPlansRepositoryGetter: Getter<CustomerPlansRepository>;
    protected customerSignupRepositoryGetter: Getter<CustomerSignupRepository>;
    protected contactInformationRepositoryGetter: Getter<ContactInformationRepository>;
    readonly user: BelongsToAccessor<Users, typeof Customer.prototype.id>;
    readonly customerRelativeRelation: HasManyRepositoryFactory<CustomerRelatives, typeof Customer.prototype.id>;
    readonly customerPlans: HasManyRepositoryFactory<CustomerPlans, typeof Customer.prototype.id>;
    readonly customerSignup: HasOneRepositoryFactory<CustomerSignup, typeof Customer.prototype.id>;
    constructor(dataSource: GbadminDataSource, usersRepositoryGetter: Getter<UsersRepository>, customerRelativesRepositoryGetter: Getter<CustomerRelativesRepository>, customerPlansRepositoryGetter: Getter<CustomerPlansRepository>, customerSignupRepositoryGetter: Getter<CustomerSignupRepository>, contactInformationRepositoryGetter: Getter<ContactInformationRepository>);
}
