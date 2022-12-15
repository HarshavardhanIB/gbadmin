import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { InsurancePlansOptions, InsurancePlansOptionsRelations } from '../models';

export class InsurancePlansOptionsRepository extends DefaultCrudRepository<
  InsurancePlansOptions,
  typeof InsurancePlansOptions.prototype.id,
  InsurancePlansOptionsRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(InsurancePlansOptions, dataSource);
  }
}
