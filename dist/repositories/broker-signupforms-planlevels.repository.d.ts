import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { BrokerSignupformsPlanlevels, BrokerSignupformsPlanlevelsRelations } from '../models';
export declare class BrokerSignupformsPlanlevelsRepository extends DefaultCrudRepository<BrokerSignupformsPlanlevels, typeof BrokerSignupformsPlanlevels.prototype.id, BrokerSignupformsPlanlevelsRelations> {
    constructor(dataSource: GbadminDataSource);
}
