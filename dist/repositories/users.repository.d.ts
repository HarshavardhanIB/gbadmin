import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { Customer, Users, UsersRelations, Broker, BrokerAdmins } from '../models';
import { CustomerRepository } from './customer.repository';
import { BrokerAdminsRepository } from './broker-admins.repository';
import { BrokerRepository } from './broker.repository';
export declare class UsersRepository extends DefaultCrudRepository<Users, typeof Users.prototype.id, UsersRelations> {
    protected customerRepositoryGetter: Getter<CustomerRepository>;
    protected brokerAdminsRepositoryGetter: Getter<BrokerAdminsRepository>;
    protected brokerRepositoryGetter: Getter<BrokerRepository>;
    readonly customer: HasOneRepositoryFactory<Customer, typeof Users.prototype.id>;
    readonly broker: HasManyThroughRepositoryFactory<Broker, typeof Broker.prototype.id, BrokerAdmins, typeof Users.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, customerRepositoryGetter: Getter<CustomerRepository>, brokerAdminsRepositoryGetter: Getter<BrokerAdminsRepository>, brokerRepositoryGetter: Getter<BrokerRepository>);
}
