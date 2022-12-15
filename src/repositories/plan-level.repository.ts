import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {PlanLevel, PlanLevelRelations} from '../models';

export class PlanLevelRepository extends DefaultCrudRepository<
  PlanLevel,
  typeof PlanLevel.prototype.id,
  PlanLevelRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(PlanLevel, dataSource);
  }
}
