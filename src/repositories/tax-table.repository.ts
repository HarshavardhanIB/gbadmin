import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {TaxTable, TaxTableRelations} from '../models';

export class TaxTableRepository extends DefaultCrudRepository<
  TaxTable,
  typeof TaxTable.prototype.id,
  TaxTableRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(TaxTable, dataSource);
  }
}
