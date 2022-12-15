import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {PlanOptions, PlanOptionsRelations} from '../models';

export class PlanOptionsRepository extends DefaultCrudRepository<
  PlanOptions,
  typeof PlanOptions.prototype.id,
  PlanOptionsRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(PlanOptions, dataSource);
  }
}
