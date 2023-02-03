import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { CustomerPlans, CustomerPlansRelations, InsurancePlans } from '../models';
import { InsurancePlansRepository } from './insurance-plans.repository';
export declare class CustomerPlansRepository extends DefaultCrudRepository<CustomerPlans, typeof CustomerPlans.prototype.id, CustomerPlansRelations> {
    protected insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>;
    readonly plan: BelongsToAccessor<InsurancePlans, typeof CustomerPlans.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, insurancePlansRepositoryGetter: Getter<InsurancePlansRepository>);
}
