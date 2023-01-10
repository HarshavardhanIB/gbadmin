import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {FinancialInstitutions, FinancialInstitutionsRelations} from '../models';

export class FinancialInstitutionsRepository extends DefaultCrudRepository<
  FinancialInstitutions,
  typeof FinancialInstitutions.prototype.id,
  FinancialInstitutionsRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(FinancialInstitutions, dataSource);
  }
}
