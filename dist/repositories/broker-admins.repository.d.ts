import { DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { BrokerAdmins, BrokerAdminsRelations } from '../models';
export declare class BrokerAdminsRepository extends DefaultCrudRepository<BrokerAdmins, typeof BrokerAdmins.prototype.id, BrokerAdminsRelations> {
    constructor(dataSource: GroupBenefitzDataSource);
}
