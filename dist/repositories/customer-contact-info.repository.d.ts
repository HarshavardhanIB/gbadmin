import { DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { CustomerContactInfo, CustomerContactInfoRelations } from '../models';
export declare class CustomerContactInfoRepository extends DefaultCrudRepository<CustomerContactInfo, typeof CustomerContactInfo.prototype.id, CustomerContactInfoRelations> {
    constructor(dataSource: GroupBenefitzDataSource);
}
