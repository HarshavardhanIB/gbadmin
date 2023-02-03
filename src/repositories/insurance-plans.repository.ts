import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {InsurancePlans, InsurancePlansOptions, InsurancePlansRelations, PlanLevel, PlanOptions, PlansAvailability} from '../models';
// import {InsuranceProductsRepository} from './insurance-products.repository';
import {InsurancePlansOptionsRepository} from './insurance-plans-options.repository';
import {PlanLevelRepository} from './plan-level.repository';
import {PlanOptionsRepository} from './plan-options.repository';
import {PlansAvailabilityRepository} from './plans-availability.repository';

export class InsurancePlansRepository extends DefaultCrudRepository<
  InsurancePlans,
  typeof InsurancePlans.prototype.id,
  InsurancePlansRelations
> {

  // public readonly products: HasManyRepositoryFactory<InsuranceProducts, typeof InsurancePlans.prototype.id>;

  public readonly stateTaxDetails: HasManyRepositoryFactory<PlansAvailability, typeof InsurancePlans.prototype.id>;

  public readonly planLevels: BelongsToAccessor<PlanLevel, typeof InsurancePlans.prototype.id>;

  public readonly planOptions: HasManyThroughRepositoryFactory<PlanOptions, typeof PlanOptions.prototype.id,
    InsurancePlansOptions,
    typeof InsurancePlans.prototype.id
  >;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource,
    // @repository.getter('InsuranceProductsRepository') protected insuranceProductsRepositoryGetter: Getter<InsuranceProductsRepository>,
    @repository.getter('PlansAvailabilityRepository') protected plansAvailabilityRepositoryGetter: Getter<PlansAvailabilityRepository>, @repository.getter('PlanLevelRepository') protected planLevelRepositoryGetter: Getter<PlanLevelRepository>, @repository.getter('InsurancePlansOptionsRepository') protected insurancePlansOptionsRepositoryGetter: Getter<InsurancePlansOptionsRepository>, @repository.getter('PlanOptionsRepository') protected planOptionsRepositoryGetter: Getter<PlanOptionsRepository>,
  ) {
    super(InsurancePlans, dataSource);
    this.planOptions = this.createHasManyThroughRepositoryFactoryFor('planOptions', planOptionsRepositoryGetter, insurancePlansOptionsRepositoryGetter,);
    this.registerInclusionResolver('planOptions', this.planOptions.inclusionResolver);
    this.planLevels = this.createBelongsToAccessorFor('planLevels', planLevelRepositoryGetter,);
    this.registerInclusionResolver('planLevels', this.planLevels.inclusionResolver);
    this.stateTaxDetails = this.createHasManyRepositoryFactoryFor('stateTaxDetails', plansAvailabilityRepositoryGetter,);
    this.registerInclusionResolver('stateTaxDetails', this.stateTaxDetails.inclusionResolver);
    //this.products = this.createHasManyRepositoryFactoryFor('products', insuranceProductsRepositoryGetter,);
    //this.registerInclusionResolver('products', this.products.inclusionResolver);

  }
}
