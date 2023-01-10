import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { EquitablePlanLevelMapping, EquitablePlanLevelMappingRelations } from '../models';
export declare class EquitablePlanLevelMappingRepository extends DefaultCrudRepository<EquitablePlanLevelMapping, typeof EquitablePlanLevelMapping.prototype.id, EquitablePlanLevelMappingRelations> {
    constructor(dataSource: GbadminDataSource);
}
