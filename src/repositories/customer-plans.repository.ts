import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { CustomerPlans, CustomerPlansRelations, InsurancePlans } from '../models';
import { InsurancePlansRepository } from './insurance-plans.repository';

export class CustomerPlansRepository extends DefaultCrudRepository<
  CustomerPlans,
  typeof CustomerPlans.prototype.id,
  CustomerPlansRelations
> {
 public readonly plan: BelongsToAccessor<InsurancePlans, typeof CustomerPlans.prototype.id>;
  constructor(
       @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource,
    @repository.getter('InsurancePlansRepository') protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>,
  ) {
    super(CustomerPlans, dataSource);
    this.plan = this.createBelongsToAccessorFor('plan', insurancePlansRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}
