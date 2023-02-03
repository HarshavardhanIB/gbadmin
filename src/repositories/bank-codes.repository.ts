import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {BankCodes, BankCodesRelations, FinancialInstitutions} from '../models';
import {FinancialInstitutionsRepository} from './financial-institutions.repository';

export class BankCodesRepository extends DefaultCrudRepository<
  BankCodes,
  typeof BankCodes.prototype.id,
  BankCodesRelations
> {

  public readonly bank: BelongsToAccessor<FinancialInstitutions, typeof BankCodes.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('FinancialInstitutionsRepository') protected financialInstitutionsRepositoryGetter: Getter<FinancialInstitutionsRepository>,
  ) {
    super(BankCodes, dataSource);
    this.bank = this.createBelongsToAccessorFor('bank', financialInstitutionsRepositoryGetter,);
    this.registerInclusionResolver('bank', this.bank.inclusionResolver);
  }
}
