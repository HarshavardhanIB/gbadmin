import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {GreenshieldPlanLevelMapping, GreenshieldPlanLevelMappingRelations} from '../models';

export class GreenshieldPlanLevelMappingRepository extends DefaultCrudRepository<
  GreenshieldPlanLevelMapping,
  typeof GreenshieldPlanLevelMapping.prototype.id,
  GreenshieldPlanLevelMappingRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(GreenshieldPlanLevelMapping, dataSource);
  }
}
