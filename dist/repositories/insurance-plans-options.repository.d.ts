import { DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { InsurancePlansOptions, InsurancePlansOptionsRelations } from '../models';
export declare class InsurancePlansOptionsRepository extends DefaultCrudRepository<InsurancePlansOptions, typeof InsurancePlansOptions.prototype.id, InsurancePlansOptionsRelations> {
    constructor(dataSource: GroupBenefitzDataSource);
}
