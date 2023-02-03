import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {BrokerAdmins, BrokerAdminsRelations} from '../models';

export class BrokerAdminsRepository extends DefaultCrudRepository<
  BrokerAdmins,
  typeof BrokerAdmins.prototype.id,
  BrokerAdminsRelations
> {
  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource,
  ) {
    super(BrokerAdmins, dataSource);
  }
}
