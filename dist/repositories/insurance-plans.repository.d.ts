import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { InsurancePlans, InsurancePlansRelations } from '../models';
export declare class InsurancePlansRepository extends DefaultCrudRepository<InsurancePlans, typeof InsurancePlans.prototype.id, InsurancePlansRelations> {
    constructor(dataSource: GbadminDataSource);
}
