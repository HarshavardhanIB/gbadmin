import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { Broker, BrokerRelations, Users } from '../models';
import { UsersRepository } from './users.repository';

export class BrokerRepository extends DefaultCrudRepository<
  Broker,
  typeof Broker.prototype.id,
  BrokerRelations
> {

  // public readonly users: HasOneRepositoryFactory<Users, typeof Broker.prototype.id>;
  public readonly user: BelongsToAccessor<Users, typeof Broker.prototype.id>;
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Broker, dataSource);
    // this.users = this.createHasOneRepositoryFactoryFor('users', usersRepositoryGetter);
    // this.registerInclusionResolver('users', this.users.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', usersRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
