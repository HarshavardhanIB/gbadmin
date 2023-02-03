import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GroupBenefitzDataSource} from '../datasources';
import {CorporateTieredPlanLevels, CorporateTieredPlanLevelsRelations} from '../models';

export class CorporateTieredPlanLevelsRepository extends DefaultCrudRepository<
  CorporateTieredPlanLevels,
  typeof CorporateTieredPlanLevels.prototype.id,
  CorporateTieredPlanLevelsRelations
> {
  constructor(
    @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource,
  ) {
    super(CorporateTieredPlanLevels, dataSource);
  }
}
