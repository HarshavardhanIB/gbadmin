import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {FinancialInstitutions, FinancialInstitutionsRoutingNumbers, FinancialInstitutionsRoutingNumbersRelations} from '../models';
import {FinancialInstitutionsRepository} from './financial-institutions.repository';

export class FinancialInstitutionsRoutingNumbersRepository extends DefaultCrudRepository<
  FinancialInstitutionsRoutingNumbers,
  typeof FinancialInstitutionsRoutingNumbers.prototype.id,
  FinancialInstitutionsRoutingNumbersRelations
> {

  public readonly banks: BelongsToAccessor<FinancialInstitutions, typeof FinancialInstitutionsRoutingNumbers.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('FinancialInstitutionsRepository') protected financialInstitutionsRepositoryGetter: Getter<FinancialInstitutionsRepository>,
  ) {
    super(FinancialInstitutionsRoutingNumbers, dataSource);
    this.banks = this.createBelongsToAccessorFor('bank', financialInstitutionsRepositoryGetter,);
    this.registerInclusionResolver('bank', this.banks.inclusionResolver);
  }
}
