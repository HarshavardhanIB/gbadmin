import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { Broker, BrokerRelations, Users, ContactInformation, BrokerEoInsurance, BrokerLicensedStatesAndProvinces, SignupForms, Customer} from '../models';
import { UsersRepository } from './users.repository';
import {ContactInformationRepository} from './contact-information.repository';
import {BrokerEoInsuranceRepository} from './broker-eo-insurance.repository';
import {BrokerLicensedStatesAndProvincesRepository} from './broker-licensed-states-and-provinces.repository';
import {SignupFormsRepository} from './signup-forms.repository';
import {CustomerRepository} from './customer.repository';

export class BrokerRepository extends DefaultCrudRepository<
  Broker,
  typeof Broker.prototype.id,
  BrokerRelations
> {


  // public readonly users: HasOneRepositoryFactory<Users, typeof Broker.prototype.id>;
  public readonly contactInfo: BelongsToAccessor<ContactInformation, typeof Broker.prototype.id>;
  public readonly brokerLicensedStatesAndProvinces: HasManyRepositoryFactory<BrokerLicensedStatesAndProvinces, typeof Broker.prototype.id>;

  public readonly subBrokers: HasManyRepositoryFactory<Broker, typeof Broker.prototype.id>;

  public readonly parent: BelongsToAccessor<Broker, typeof Broker.prototype.id>;

  public readonly brokerEoInsurance: HasOneRepositoryFactory<BrokerEoInsurance, typeof Broker.prototype.id>;


  //public readonly brokerLicensedStatesAndProvinces: HasManyRepositoryFactory<BrokerLicensedStatesAndProvinces, typeof Broker.prototype.id>;
  public readonly customers: HasManyRepositoryFactory<Customer, typeof Broker.prototype.id>;
  public readonly signupForms: HasManyRepositoryFactory<SignupForms, typeof Broker.prototype.id>;
  public readonly user: BelongsToAccessor<Users, typeof Broker.prototype.id>;
  constructor(
    @inject('datasources.groupBenefitz')
    dataSource: GroupBenefitzDataSource,
    @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, 
    @repository.getter('ContactInformationRepository') protected contactInformationRepositoryGetter: Getter<ContactInformationRepository>, 
    @repository.getter('BrokerEoInsuranceRepository') protected brokerEoInsuranceRepositoryGetter: Getter<BrokerEoInsuranceRepository>, 
    @repository.getter('BrokerLicensedStatesAndProvincesRepository') protected brokerLicensedStatesAndProvincesRepositoryGetter: Getter<BrokerLicensedStatesAndProvincesRepository>, 
    @repository.getter('SignupFormsRepository') protected signupFormsRepositoryGetter: Getter<SignupFormsRepository>, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(Broker, dataSource);
    this.customers = this.createHasManyRepositoryFactoryFor('customers', customerRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
    
      this.parent = this.createBelongsToAccessorFor('parent', Getter.fromValue(this),);
    this.registerInclusionResolver('parent', this.parent.inclusionResolver);

    this.subBrokers = this.createHasManyRepositoryFactoryFor('subBrokers', Getter.fromValue(this));
    this.registerInclusionResolver('subBrokers', this.subBrokers.inclusionResolver);    
    this.signupForms = this.createHasManyRepositoryFactoryFor('signupForms', signupFormsRepositoryGetter,);
    this.registerInclusionResolver('signupForms', this.signupForms.inclusionResolver);
    this.brokerLicensedStatesAndProvinces = this.createHasManyRepositoryFactoryFor('brokerLicensedStatesAndProvinces', brokerLicensedStatesAndProvincesRepositoryGetter,);
    this.registerInclusionResolver('brokerLicensedStatesAndProvinces', this.brokerLicensedStatesAndProvinces.inclusionResolver);
    this.brokerEoInsurance = this.createHasOneRepositoryFactoryFor('brokerEoInsurance', brokerEoInsuranceRepositoryGetter);
    this.registerInclusionResolver('brokerEoInsurance', this.brokerEoInsurance.inclusionResolver);
    this.contactInfo = this.createBelongsToAccessorFor('contactInfo', contactInformationRepositoryGetter,);
    this.registerInclusionResolver('contactInfo', this.contactInfo.inclusionResolver);
    // this.users = this.createHasOneRepositoryFactoryFor('users', usersRepositoryGetter);
    // this.registerInclusionResolver('users', this.users.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', usersRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
