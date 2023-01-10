import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { FinancialInstitutionsRoutingNumbers, FinancialInstitutionsRoutingNumbersRelations } from '../models';
export declare class FinancialInstitutionsRoutingNumbersRepository extends DefaultCrudRepository<FinancialInstitutionsRoutingNumbers, typeof FinancialInstitutionsRoutingNumbers.prototype.id, FinancialInstitutionsRoutingNumbersRelations> {
    constructor(dataSource: GbadminDataSource);
}
