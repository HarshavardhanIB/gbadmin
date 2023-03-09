import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {  GroupBenefitzDataSource } from '../datasources';
import { Customer, Users, UsersRelations, Broker, BrokerAdmins} from '../models';
import { CustomerRepository } from './customer.repository';
import {BrokerAdminsRepository} from './broker-admins.repository';
import {BrokerRepository} from './broker.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  public readonly customer: HasOneRepositoryFactory<Customer, typeof Users.prototype.id>;

  public readonly broker: HasManyThroughRepositoryFactory<Broker, typeof Broker.prototype.id,
          BrokerAdmins,
          typeof Users.prototype.id
        >;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource,
    @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('BrokerAdminsRepository') protected brokerAdminsRepositoryGetter: Getter<BrokerAdminsRepository>, @repository.getter('BrokerRepository') protected brokerRepositoryGetter: Getter<BrokerRepository>,
  ) {
    super(Users, dataSource);
    this.broker = this.createHasManyThroughRepositoryFactoryFor('broker', brokerRepositoryGetter, brokerAdminsRepositoryGetter,);
    this.registerInclusionResolver('broker', this.broker.inclusionResolver);
    this.customer = this.createHasOneRepositoryFactoryFor('customer', customerRepositoryGetter);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
