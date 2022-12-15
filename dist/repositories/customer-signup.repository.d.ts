import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CustomerSignup, CustomerSignupRelations } from '../models';
export declare class CustomerSignupRepository extends DefaultCrudRepository<CustomerSignup, typeof CustomerSignup.prototype.id, CustomerSignupRelations> {
    constructor(dataSource: GbadminDataSource);
}
