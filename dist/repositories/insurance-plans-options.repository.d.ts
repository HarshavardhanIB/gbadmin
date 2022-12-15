import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { InsurancePlansOptions, InsurancePlansOptionsRelations } from '../models';
export declare class InsurancePlansOptionsRepository extends DefaultCrudRepository<InsurancePlansOptions, typeof InsurancePlansOptions.prototype.id, InsurancePlansOptionsRelations> {
    constructor(dataSource: GbadminDataSource);
}
