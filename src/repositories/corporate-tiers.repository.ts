import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {CorporateTiers, CorporateTiersRelations} from '../models';

export class CorporateTiersRepository extends DefaultCrudRepository<
  CorporateTiers,
  typeof CorporateTiers.prototype.id,
  CorporateTiersRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(CorporateTiers, dataSource);
  }
}
