import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {FinancialInstitutionsRoutingNumbers, FinancialInstitutionsRoutingNumbersRelations} from '../models';

export class FinancialInstitutionsRoutingNumbersRepository extends DefaultCrudRepository<
  FinancialInstitutionsRoutingNumbers,
  typeof FinancialInstitutionsRoutingNumbers.prototype.id,
  FinancialInstitutionsRoutingNumbersRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(FinancialInstitutionsRoutingNumbers, dataSource);
  }
}
