import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { FinancialInstitutions, FinancialInstitutionsRoutingNumbers, FinancialInstitutionsRoutingNumbersRelations } from '../models';
import { FinancialInstitutionsRepository } from './financial-institutions.repository';
export declare class FinancialInstitutionsRoutingNumbersRepository extends DefaultCrudRepository<FinancialInstitutionsRoutingNumbers, typeof FinancialInstitutionsRoutingNumbers.prototype.id, FinancialInstitutionsRoutingNumbersRelations> {
    protected financialInstitutionsRepositoryGetter: Getter<FinancialInstitutionsRepository>;
    readonly banks: BelongsToAccessor<FinancialInstitutions, typeof FinancialInstitutionsRoutingNumbers.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, financialInstitutionsRepositoryGetter: Getter<FinancialInstitutionsRepository>);
}
