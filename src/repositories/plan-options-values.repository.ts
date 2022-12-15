import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {PlanOptionsValues, PlanOptionsValuesRelations} from '../models';

export class PlanOptionsValuesRepository extends DefaultCrudRepository<
  PlanOptionsValues,
  typeof PlanOptionsValues.prototype.id,
  PlanOptionsValuesRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(PlanOptionsValues, dataSource);
  }
}
