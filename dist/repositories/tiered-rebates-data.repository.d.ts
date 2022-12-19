import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { TieredRebatesData, TieredRebatesDataRelations } from '../models';
export declare class TieredRebatesDataRepository extends DefaultCrudRepository<TieredRebatesData, typeof TieredRebatesData.prototype.id, TieredRebatesDataRelations> {
    constructor(dataSource: GbadminDataSource);
}
