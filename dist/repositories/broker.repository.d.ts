import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { Broker, BrokerRelations, Users } from '../models';
import { UsersRepository } from './users.repository';
export declare class BrokerRepository extends DefaultCrudRepository<Broker, typeof Broker.prototype.id, BrokerRelations> {
    protected usersRepositoryGetter: Getter<UsersRepository>;
    readonly user: BelongsToAccessor<Users, typeof Broker.prototype.id>;
    constructor(dataSource: GbadminDataSource, usersRepositoryGetter: Getter<UsersRepository>);
}
