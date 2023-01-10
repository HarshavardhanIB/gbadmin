import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { FinancialInstitutions, FinancialInstitutionsRelations } from '../models';
export declare class FinancialInstitutionsRepository extends DefaultCrudRepository<FinancialInstitutions, typeof FinancialInstitutions.prototype.id, FinancialInstitutionsRelations> {
    constructor(dataSource: GbadminDataSource);
}
