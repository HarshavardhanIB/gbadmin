import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {CorporateWallet, CorporateWalletRelations} from '../models';

export class CorporateWalletRepository extends DefaultCrudRepository<
  CorporateWallet,
  typeof CorporateWallet.prototype.id,
  CorporateWalletRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(CorporateWallet, dataSource);
  }
}
