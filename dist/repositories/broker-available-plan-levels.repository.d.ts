import { DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { BrokerAvailablePlanLevels, BrokerAvailablePlanLevelsRelations } from '../models';
export declare class BrokerAvailablePlanLevelsRepository extends DefaultCrudRepository<BrokerAvailablePlanLevels, typeof BrokerAvailablePlanLevels.prototype.id, BrokerAvailablePlanLevelsRelations> {
    constructor(dataSource: GroupBenefitzDataSource);
}
