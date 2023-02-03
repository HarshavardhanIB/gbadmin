import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { CustomerContactInfo, CustomerContactInfoRelations } from '../models';

export class CustomerContactInfoRepository extends DefaultCrudRepository<
  CustomerContactInfo,
  typeof CustomerContactInfo.prototype.id,
  CustomerContactInfoRelations
> {
  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource,
  ) {
    super(CustomerContactInfo, dataSource);
  }
}
