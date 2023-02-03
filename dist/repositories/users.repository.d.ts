import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { Customer, Users, UsersRelations } from '../models';
import { CustomerRepository } from './customer.repository';
export declare class UsersRepository extends DefaultCrudRepository<Users, typeof Users.prototype.id, UsersRelations> {
    protected customerRepositoryGetter: Getter<CustomerRepository>;
    readonly customer: HasOneRepositoryFactory<Customer, typeof Users.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, customerRepositoryGetter: Getter<CustomerRepository>);
}
