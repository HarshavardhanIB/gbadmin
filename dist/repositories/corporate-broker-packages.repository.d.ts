import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CorporateBrokerPackages, CorporateBrokerPackagesRelations } from '../models';
export declare class CorporateBrokerPackagesRepository extends DefaultCrudRepository<CorporateBrokerPackages, typeof CorporateBrokerPackages.prototype.id, CorporateBrokerPackagesRelations> {
    constructor(dataSource: GbadminDataSource);
}
