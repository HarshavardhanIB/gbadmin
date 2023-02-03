import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { PlanOptions, PlanOptionsRelations, PlanOptionsValues } from '../models';
import { PlanOptionsValuesRepository } from './plan-options-values.repository';
export declare class PlanOptionsRepository extends DefaultCrudRepository<PlanOptions, typeof PlanOptions.prototype.id, PlanOptionsRelations> {
    protected planOptionsValuesRepositoryGetter: Getter<PlanOptionsValuesRepository>;
    readonly planOptionsValues: HasManyRepositoryFactory<PlanOptionsValues, typeof PlanOptions.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, planOptionsValuesRepositoryGetter: Getter<PlanOptionsValuesRepository>);
}
