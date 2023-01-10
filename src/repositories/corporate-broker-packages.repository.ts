import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {CorporateBrokerPackages, CorporateBrokerPackagesRelations} from '../models';

export class CorporateBrokerPackagesRepository extends DefaultCrudRepository<
  CorporateBrokerPackages,
  typeof CorporateBrokerPackages.prototype.id,
  CorporateBrokerPackagesRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(CorporateBrokerPackages, dataSource);
  }
}
