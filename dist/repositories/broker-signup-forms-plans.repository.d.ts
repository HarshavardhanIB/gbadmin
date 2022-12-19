import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { BrokerSignupFormsPlans, BrokerSignupFormsPlansRelations } from '../models';
export declare class BrokerSignupFormsPlansRepository extends DefaultCrudRepository<BrokerSignupFormsPlans, typeof BrokerSignupFormsPlans.prototype.id, BrokerSignupFormsPlansRelations> {
    constructor(dataSource: GbadminDataSource);
}
