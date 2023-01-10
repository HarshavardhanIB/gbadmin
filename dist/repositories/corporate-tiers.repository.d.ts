import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CorporateTiers, CorporateTiersRelations } from '../models';
export declare class CorporateTiersRepository extends DefaultCrudRepository<CorporateTiers, typeof CorporateTiers.prototype.id, CorporateTiersRelations> {
    constructor(dataSource: GbadminDataSource);
}
