import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {FinancialInstitutions, FinancialInstitutionsRelations, FinancialInstitutionsRoutingNumbers} from '../models';
import {FinancialInstitutionsRoutingNumbersRepository} from './financial-institutions-routing-numbers.repository';

export class FinancialInstitutionsRepository extends DefaultCrudRepository<
  FinancialInstitutions,
  typeof FinancialInstitutions.prototype.id,
  FinancialInstitutionsRelations
> {

  public readonly branches: HasManyRepositoryFactory<FinancialInstitutionsRoutingNumbers, typeof FinancialInstitutions.prototype.id>;

  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('FinancialInstitutionsRoutingNumbersRepository') protected financialInstitutionsRoutingNumbersRepositoryGetter: Getter<FinancialInstitutionsRoutingNumbersRepository>,
  ) {
    super(FinancialInstitutions, dataSource);
    this.branches = this.createHasManyRepositoryFactoryFor('branches', financialInstitutionsRoutingNumbersRepositoryGetter,);
    this.registerInclusionResolver('branches', this.branches.inclusionResolver);
  }
}
