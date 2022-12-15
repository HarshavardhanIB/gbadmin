import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {InsurancePlans, InsurancePlansRelations} from '../models';

export class InsurancePlansRepository extends DefaultCrudRepository<
  InsurancePlans,
  typeof InsurancePlans.prototype.id,
  InsurancePlansRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(InsurancePlans, dataSource);
  }
}
