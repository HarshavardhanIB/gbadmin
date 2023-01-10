import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {PlanLevelFeatures, PlanLevelFeaturesRelations} from '../models';

export class PlanLevelFeaturesRepository extends DefaultCrudRepository<
  PlanLevelFeatures,
  typeof PlanLevelFeatures.prototype.id,
  PlanLevelFeaturesRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(PlanLevelFeatures, dataSource);
  }
}
