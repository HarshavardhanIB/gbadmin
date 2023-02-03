import { DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { PlanFeatures, PlanFeaturesRelations } from '../models';
export declare class PlanFeaturesRepository extends DefaultCrudRepository<PlanFeatures, typeof PlanFeatures.prototype.id, PlanFeaturesRelations> {
    constructor(dataSource: GroupBenefitzDataSource);
}
