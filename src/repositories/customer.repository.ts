import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { Customer, CustomerRelations, Users, CustomerRelatives, CustomerPlans, CustomerSignup, ContactInformation, CustomerContactInfo, InsurancePlans, CustomerPlanOptionsValues} from '../models';
import { UsersRepository } from './users.repository';
import { CustomerRelativesRepository } from './customer-relatives.repository';
import { CustomerPlansRepository } from './customer-plans.repository';
import { CustomerSignupRepository } from './customer-signup.repository';
import { ContactInformationRepository } from './contact-information.repository';
import { CustomerContactInfoRepository } from './customer-contact-info.repository';
import { InsurancePlansRepository } from './insurance-plans.repository';
import {CustomerPlanOptionsValuesRepository} from './customer-plan-options-values.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {
  public readonly user: BelongsToAccessor<Users, typeof Customer.prototype.id>;

  public readonly childCustomers: HasManyRepositoryFactory<Customer, typeof Customer.prototype.id>;

  public readonly parent: BelongsToAccessor<Customer, typeof Customer.prototype.id>;

  public readonly customerRelatives: HasManyRepositoryFactory<CustomerRelatives, typeof Customer.prototype.id>;

  public readonly customerSignup: HasOneRepositoryFactory<CustomerSignup, typeof Customer.prototype.id>;

  public readonly contactInformations: HasManyThroughRepositoryFactory<ContactInformation, typeof ContactInformation.prototype.id,
    CustomerContactInfo,
    typeof Customer.prototype.id
  >;

  public readonly customerContactInfos: HasManyRepositoryFactory<CustomerContactInfo, typeof Customer.prototype.id>;

  public readonly subscriptionPlans: HasManyThroughRepositoryFactory<InsurancePlans, typeof InsurancePlans.prototype.id,
    CustomerPlans,
    typeof Customer.prototype.id
  >;

  public readonly customerPlans: HasManyRepositoryFactory<CustomerPlans, typeof Customer.prototype.id>;

  public readonly customerPlanOptionsValues: HasManyRepositoryFactory<CustomerPlanOptionsValues, typeof Customer.prototype.id>;

  // >;
  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource,
    @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
    @repository.getter('CustomerRelativesRepository') protected customerRelativesRepositoryGetter: Getter<CustomerRelativesRepository>,
    @repository.getter('CustomerSignupRepository') protected customerSignupRepositoryGetter: Getter<CustomerSignupRepository>,
    @repository.getter('CustomerContactInfoRepository') protected customerContactInfoRepositoryGetter: Getter<CustomerContactInfoRepository>,
    @repository.getter('ContactInformationRepository') protected contactInformationRepositoryGetter: Getter<ContactInformationRepository>,
    @repository.getter('CustomerPlansRepository') protected customerPlansRepositoryGetter: Getter<CustomerPlansRepository>,
    @repository.getter('InsurancePlansRepository') protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>,
    @repository.getter('CustomerPlanOptionsValuesRepository') protected customerPlanOptionsValuesRepositoryGetter: Getter<CustomerPlanOptionsValuesRepository>,
  ) {
    super(Customer, dataSource);
    this.customerPlanOptionsValues = this.createHasManyRepositoryFactoryFor('customerPlanOptionsValues', customerPlanOptionsValuesRepositoryGetter,);
    this.registerInclusionResolver('customerPlanOptionsValues', this.customerPlanOptionsValues.inclusionResolver);

    this.customerPlans = this.createHasManyRepositoryFactoryFor('customerPlans', customerPlansRepositoryGetter,);
    this.registerInclusionResolver('customerPlans', this.customerPlans.inclusionResolver);
    this.subscriptionPlans = this.createHasManyThroughRepositoryFactoryFor('subscriptionPlans', insurancePlansRepositoryGetter, customerPlansRepositoryGetter,);
    this.registerInclusionResolver('subscriptionPlans', this.subscriptionPlans.inclusionResolver);
    this.customerContactInfos = this.createHasManyRepositoryFactoryFor('customerContactInfos', customerContactInfoRepositoryGetter,);
    this.registerInclusionResolver('customerContactInfos', this.customerContactInfos.inclusionResolver);
    this.contactInformations = this.createHasManyThroughRepositoryFactoryFor('contactInformations', contactInformationRepositoryGetter, customerContactInfoRepositoryGetter,);
    this.registerInclusionResolver('contactInformations', this.contactInformations.inclusionResolver);
    this.customerSignup = this.createHasOneRepositoryFactoryFor('customerSignup', customerSignupRepositoryGetter);
    this.registerInclusionResolver('customerSignup', this.customerSignup.inclusionResolver);
    this.customerRelatives = this.createHasManyRepositoryFactoryFor('customerRelatives', customerRelativesRepositoryGetter,);
    this.registerInclusionResolver('customerRelatives', this.customerRelatives.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', usersRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    // this.contactInformations = this.createHasManyThroughRepositoryFactoryFor('contactInformations', contactInformationRepositoryGetter, customerContactInfoRepositoryGetter,);
    // this.registerInclusionResolver('contactInformations', this.contactInformations.inclusionResolver);
    // this.subscriptionPlans = this.createHasManyThroughRepositoryFactoryFor('subscriptionPlans', insurancePlansRepositoryGetter, customerPlansRepositoryGetter,);
    // this.registerInclusionResolver('subscriptionPlans', this.subscriptionPlans.inclusionResolver);

    this.parent = this.createBelongsToAccessorFor('parent', Getter.fromValue(this),);
    this.registerInclusionResolver('parent', this.parent.inclusionResolver);

    this.childCustomers = this.createHasManyRepositoryFactoryFor('childCustomers', Getter.fromValue(this));
    this.registerInclusionResolver('childCustomers', this.childCustomers.inclusionResolver);
  }

}
