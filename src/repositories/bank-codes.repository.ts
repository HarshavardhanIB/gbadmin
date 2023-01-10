import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {BankCodes, BankCodesRelations} from '../models';

export class BankCodesRepository extends DefaultCrudRepository<
  BankCodes,
  typeof BankCodes.prototype.id,
  BankCodesRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(BankCodes, dataSource);
  }
}
