import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CustomerPlans, CustomerPlansRelations } from '../models';
export declare class CustomerPlansRepository extends DefaultCrudRepository<CustomerPlans, typeof CustomerPlans.prototype.id, CustomerPlansRelations> {
    constructor(dataSource: GbadminDataSource);
}
