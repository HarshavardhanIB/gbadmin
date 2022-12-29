import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { Broker, BrokerRelations, Users, ContactInformation, BrokerEoInsurance, BrokerLicensedStatesAndProvinces, SignupForms } from '../models';
import { UsersRepository } from './users.repository';
import { ContactInformationRepository } from './contact-information.repository';
import { BrokerEoInsuranceRepository } from './broker-eo-insurance.repository';
import { BrokerLicensedStatesAndProvincesRepository } from './broker-licensed-states-and-provinces.repository';
import { SignupFormsRepository } from './signup-forms.repository';
export declare class BrokerRepository extends DefaultCrudRepository<Broker, typeof Broker.prototype.id, BrokerRelations> {
    protected usersRepositoryGetter: Getter<UsersRepository>;
    protected contactInformationRepositoryGetter: Getter<ContactInformationRepository>;
    protected brokerEoInsuranceRepositoryGetter: Getter<BrokerEoInsuranceRepository>;
    protected brokerLicensedStatesAndProvincesRepositoryGetter: Getter<BrokerLicensedStatesAndProvincesRepository>;
    protected signupFormsRepositoryGetter: Getter<SignupFormsRepository>;
    readonly contactInfo: BelongsToAccessor<ContactInformation, typeof Broker.prototype.id>;
    readonly brokerEoInsurance: HasOneRepositoryFactory<BrokerEoInsurance, typeof Broker.prototype.id>;
    readonly brokerLicensedStatesAndProvinces: HasManyRepositoryFactory<BrokerLicensedStatesAndProvinces, typeof Broker.prototype.id>;
    readonly signupForms: HasManyRepositoryFactory<SignupForms, typeof Broker.prototype.id>;
    readonly user: BelongsToAccessor<Users, typeof Broker.prototype.id>;
    constructor(dataSource: GbadminDataSource, usersRepositoryGetter: Getter<UsersRepository>, contactInformationRepositoryGetter: Getter<ContactInformationRepository>, brokerEoInsuranceRepositoryGetter: Getter<BrokerEoInsuranceRepository>, brokerLicensedStatesAndProvincesRepositoryGetter: Getter<BrokerLicensedStatesAndProvincesRepository>, signupFormsRepositoryGetter: Getter<SignupFormsRepository>);
}
