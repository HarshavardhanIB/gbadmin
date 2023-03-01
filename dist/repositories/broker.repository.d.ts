import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { Broker, BrokerRelations, Users, ContactInformation, BrokerEoInsurance, BrokerLicensedStatesAndProvinces, SignupForms, Customer } from '../models';
import { UsersRepository } from './users.repository';
import { ContactInformationRepository } from './contact-information.repository';
import { BrokerEoInsuranceRepository } from './broker-eo-insurance.repository';
import { BrokerLicensedStatesAndProvincesRepository } from './broker-licensed-states-and-provinces.repository';
import { SignupFormsRepository } from './signup-forms.repository';
import { CustomerRepository } from './customer.repository';
export declare class BrokerRepository extends DefaultCrudRepository<Broker, typeof Broker.prototype.id, BrokerRelations> {
    protected usersRepositoryGetter: Getter<UsersRepository>;
    protected contactInformationRepositoryGetter: Getter<ContactInformationRepository>;
    protected brokerEoInsuranceRepositoryGetter: Getter<BrokerEoInsuranceRepository>;
    protected brokerLicensedStatesAndProvincesRepositoryGetter: Getter<BrokerLicensedStatesAndProvincesRepository>;
    protected signupFormsRepositoryGetter: Getter<SignupFormsRepository>;
    protected customerRepositoryGetter: Getter<CustomerRepository>;
    readonly contactInfo: BelongsToAccessor<ContactInformation, typeof Broker.prototype.id>;
    readonly brokerLicensedStatesAndProvinces: HasManyRepositoryFactory<BrokerLicensedStatesAndProvinces, typeof Broker.prototype.id>;
    readonly subBrokers: HasManyRepositoryFactory<Broker, typeof Broker.prototype.id>;
    readonly parent: BelongsToAccessor<Broker, typeof Broker.prototype.id>;
    readonly brokerEoInsurance: HasOneRepositoryFactory<BrokerEoInsurance, typeof Broker.prototype.id>;
    readonly customers: HasManyRepositoryFactory<Customer, typeof Broker.prototype.id>;
    readonly signupForms: HasManyRepositoryFactory<SignupForms, typeof Broker.prototype.id>;
    readonly user: BelongsToAccessor<Users, typeof Broker.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, usersRepositoryGetter: Getter<UsersRepository>, contactInformationRepositoryGetter: Getter<ContactInformationRepository>, brokerEoInsuranceRepositoryGetter: Getter<BrokerEoInsuranceRepository>, brokerLicensedStatesAndProvincesRepositoryGetter: Getter<BrokerLicensedStatesAndProvincesRepository>, signupFormsRepositoryGetter: Getter<SignupFormsRepository>, customerRepositoryGetter: Getter<CustomerRepository>);
}
