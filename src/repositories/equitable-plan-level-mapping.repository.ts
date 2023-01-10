import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {EquitablePlanLevelMapping, EquitablePlanLevelMappingRelations} from '../models';

export class EquitablePlanLevelMappingRepository extends DefaultCrudRepository<
  EquitablePlanLevelMapping,
  typeof EquitablePlanLevelMapping.prototype.id,
  EquitablePlanLevelMappingRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(EquitablePlanLevelMapping, dataSource);
  }
}
