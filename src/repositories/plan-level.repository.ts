import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {InsurancePlans, PlanLevel, PlanLevelRelations, GreenshieldPlanLevelMapping, PlanLevelFeatures, PlanFeatures, EquitablePlanLevelMapping} from '../models';
import {InsurancePlansRepository} from './insurance-plans.repository';
import {GreenshieldPlanLevelMappingRepository} from './greenshield-plan-level-mapping.repository';
import {PlanLevelFeaturesRepository} from './plan-level-features.repository';
import {PlanFeaturesRepository} from './plan-features.repository';
import {EquitablePlanLevelMappingRepository} from './equitable-plan-level-mapping.repository';

export class PlanLevelRepository extends DefaultCrudRepository<
  PlanLevel,
  typeof PlanLevel.prototype.id,
  PlanLevelRelations
> {

  public readonly plans: HasManyRepositoryFactory<InsurancePlans, typeof PlanLevel.prototype.id>;

  public readonly greenshieldPackages: HasManyRepositoryFactory<GreenshieldPlanLevelMapping, typeof PlanLevel.prototype.id>;

  public readonly planLevelFeatures: HasManyRepositoryFactory<PlanLevelFeatures, typeof PlanLevel.prototype.id>;

  public readonly planFeatures: HasManyThroughRepositoryFactory<PlanFeatures, typeof PlanFeatures.prototype.id,
          PlanLevelFeatures,
          typeof PlanLevel.prototype.id
        >;

  public readonly equitablePackages: HasManyRepositoryFactory<EquitablePlanLevelMapping, typeof PlanLevel.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('InsurancePlansRepository') protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>, @repository.getter('GreenshieldPlanLevelMappingRepository') protected greenshieldPlanLevelMappingRepositoryGetter: Getter<GreenshieldPlanLevelMappingRepository>, @repository.getter('PlanLevelFeaturesRepository') protected planLevelFeaturesRepositoryGetter: Getter<PlanLevelFeaturesRepository>, @repository.getter('PlanFeaturesRepository') protected planFeaturesRepositoryGetter: Getter<PlanFeaturesRepository>, @repository.getter('EquitablePlanLevelMappingRepository') protected equitablePlanLevelMappingRepositoryGetter: Getter<EquitablePlanLevelMappingRepository>,
  ) {
    super(PlanLevel, dataSource);
    this.equitablePackages = this.createHasManyRepositoryFactoryFor('equitablePackages', equitablePlanLevelMappingRepositoryGetter,);
    this.registerInclusionResolver('equitablePackages', this.equitablePackages.inclusionResolver);
    this.planFeatures = this.createHasManyThroughRepositoryFactoryFor('planFeatures', planFeaturesRepositoryGetter, planLevelFeaturesRepositoryGetter,);
    this.registerInclusionResolver('planFeatures', this.planFeatures.inclusionResolver);
    this.planLevelFeatures = this.createHasManyRepositoryFactoryFor('planLevelFeatures', planLevelFeaturesRepositoryGetter,);
    this.registerInclusionResolver('planLevelFeatures', this.planLevelFeatures.inclusionResolver);
    this.greenshieldPackages = this.createHasManyRepositoryFactoryFor('greenshieldPackages', greenshieldPlanLevelMappingRepositoryGetter,);
    this.registerInclusionResolver('greenshieldPackages', this.greenshieldPackages.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', insurancePlansRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
  }
}
