import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { FinancialInstitutions, FinancialInstitutionsRelations, FinancialInstitutionsRoutingNumbers } from '../models';
import { FinancialInstitutionsRoutingNumbersRepository } from './financial-institutions-routing-numbers.repository';
export declare class FinancialInstitutionsRepository extends DefaultCrudRepository<FinancialInstitutions, typeof FinancialInstitutions.prototype.id, FinancialInstitutionsRelations> {
    protected financialInstitutionsRoutingNumbersRepositoryGetter: Getter<FinancialInstitutionsRoutingNumbersRepository>;
    readonly branches: HasManyRepositoryFactory<FinancialInstitutionsRoutingNumbers, typeof FinancialInstitutions.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, financialInstitutionsRoutingNumbersRepositoryGetter: Getter<FinancialInstitutionsRoutingNumbersRepository>);
}
