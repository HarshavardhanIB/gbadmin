import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { PlanOptions, PlanOptionsRelations } from '../models';
export declare class PlanOptionsRepository extends DefaultCrudRepository<PlanOptions, typeof PlanOptions.prototype.id, PlanOptionsRelations> {
    constructor(dataSource: GbadminDataSource);
}
