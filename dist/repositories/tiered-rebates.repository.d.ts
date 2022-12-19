import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { TieredRebates, TieredRebatesRelations } from '../models';
export declare class TieredRebatesRepository extends DefaultCrudRepository<TieredRebates, typeof TieredRebates.prototype.id, TieredRebatesRelations> {
    constructor(dataSource: GbadminDataSource);
}
