import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { PlanLevelFeatures, PlanLevelFeaturesRelations } from '../models';
export declare class PlanLevelFeaturesRepository extends DefaultCrudRepository<PlanLevelFeatures, typeof PlanLevelFeatures.prototype.id, PlanLevelFeaturesRelations> {
    constructor(dataSource: GbadminDataSource);
}
