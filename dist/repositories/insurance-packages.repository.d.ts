import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { InsurancePackages, InsurancePackagesRelations } from '../models';
export declare class InsurancePackagesRepository extends DefaultCrudRepository<InsurancePackages, typeof InsurancePackages.prototype.id, InsurancePackagesRelations> {
    constructor(dataSource: GbadminDataSource);
}
