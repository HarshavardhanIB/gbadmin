import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { GreenshieldPlanLevelMapping, GreenshieldPlanLevelMappingRelations } from '../models';
export declare class GreenshieldPlanLevelMappingRepository extends DefaultCrudRepository<GreenshieldPlanLevelMapping, typeof GreenshieldPlanLevelMapping.prototype.id, GreenshieldPlanLevelMappingRelations> {
    constructor(dataSource: GbadminDataSource);
}
