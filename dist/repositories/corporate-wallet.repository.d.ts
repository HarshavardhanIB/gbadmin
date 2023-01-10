import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CorporateWallet, CorporateWalletRelations } from '../models';
export declare class CorporateWalletRepository extends DefaultCrudRepository<CorporateWallet, typeof CorporateWallet.prototype.id, CorporateWalletRelations> {
    constructor(dataSource: GbadminDataSource);
}
