import { DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { BrokerEoInsurance, BrokerEoInsuranceRelations } from '../models';
export declare class BrokerEoInsuranceRepository extends DefaultCrudRepository<BrokerEoInsurance, typeof BrokerEoInsurance.prototype.id, BrokerEoInsuranceRelations> {
    constructor(dataSource: GroupBenefitzDataSource);
}
