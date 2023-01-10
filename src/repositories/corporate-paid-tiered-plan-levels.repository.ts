import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {CorporatePaidTieredPlanLevels, CorporatePaidTieredPlanLevelsRelations} from '../models';

export class CorporatePaidTieredPlanLevelsRepository extends DefaultCrudRepository<
  CorporatePaidTieredPlanLevels,
  typeof CorporatePaidTieredPlanLevels.prototype.id,
  CorporatePaidTieredPlanLevelsRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(CorporatePaidTieredPlanLevels, dataSource);
  }
}
