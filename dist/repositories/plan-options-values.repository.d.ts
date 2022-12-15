import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { PlanOptionsValues, PlanOptionsValuesRelations } from '../models';
export declare class PlanOptionsValuesRepository extends DefaultCrudRepository<PlanOptionsValues, typeof PlanOptionsValues.prototype.id, PlanOptionsValuesRelations> {
    constructor(dataSource: GbadminDataSource);
}
