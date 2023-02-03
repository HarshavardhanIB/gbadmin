import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { BankCodes, BankCodesRelations, FinancialInstitutions } from '../models';
import { FinancialInstitutionsRepository } from './financial-institutions.repository';
export declare class BankCodesRepository extends DefaultCrudRepository<BankCodes, typeof BankCodes.prototype.id, BankCodesRelations> {
    protected financialInstitutionsRepositoryGetter: Getter<FinancialInstitutionsRepository>;
    readonly bank: BelongsToAccessor<FinancialInstitutions, typeof BankCodes.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, financialInstitutionsRepositoryGetter: Getter<FinancialInstitutionsRepository>);
}
