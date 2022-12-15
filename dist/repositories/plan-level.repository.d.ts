import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { PlanLevel, PlanLevelRelations } from '../models';
export declare class PlanLevelRepository extends DefaultCrudRepository<PlanLevel, typeof PlanLevel.prototype.id, PlanLevelRelations> {
    constructor(dataSource: GbadminDataSource);
}
