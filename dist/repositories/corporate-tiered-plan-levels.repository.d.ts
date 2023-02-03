import { DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { CorporateTieredPlanLevels, CorporateTieredPlanLevelsRelations } from '../models';
export declare class CorporateTieredPlanLevelsRepository extends DefaultCrudRepository<CorporateTieredPlanLevels, typeof CorporateTieredPlanLevels.prototype.id, CorporateTieredPlanLevelsRelations> {
    constructor(dataSource: GroupBenefitzDataSource);
}
