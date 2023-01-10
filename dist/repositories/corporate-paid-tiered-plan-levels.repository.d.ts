import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CorporatePaidTieredPlanLevels, CorporatePaidTieredPlanLevelsRelations } from '../models';
export declare class CorporatePaidTieredPlanLevelsRepository extends DefaultCrudRepository<CorporatePaidTieredPlanLevels, typeof CorporatePaidTieredPlanLevels.prototype.id, CorporatePaidTieredPlanLevelsRelations> {
    constructor(dataSource: GbadminDataSource);
}
