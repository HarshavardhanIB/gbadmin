import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {InsurancePackages, InsurancePackagesRelations} from '../models';

export class InsurancePackagesRepository extends DefaultCrudRepository<
  InsurancePackages,
  typeof InsurancePackages.prototype.id,
  InsurancePackagesRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(InsurancePackages, dataSource);
  }
}
