import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {PlansAvailability, PlansAvailabilityRelations} from '../models';

export class PlansAvailabilityRepository extends DefaultCrudRepository<
  PlansAvailability,
  typeof PlansAvailability.prototype.id,
  PlansAvailabilityRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(PlansAvailability, dataSource);
  }
}
