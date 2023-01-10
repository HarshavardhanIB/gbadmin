import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { BankCodes, BankCodesRelations } from '../models';
export declare class BankCodesRepository extends DefaultCrudRepository<BankCodes, typeof BankCodes.prototype.id, BankCodesRelations> {
    constructor(dataSource: GbadminDataSource);
}
