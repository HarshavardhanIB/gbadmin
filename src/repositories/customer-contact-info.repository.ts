import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CustomerContactInfo, CustomerContactInfoRelations } from '../models';

export class CustomerContactInfoRepository extends DefaultCrudRepository<
  CustomerContactInfo,
  typeof CustomerContactInfo.prototype.id,
  CustomerContactInfoRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(CustomerContactInfo, dataSource);
  }
}
