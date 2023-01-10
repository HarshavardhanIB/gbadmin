import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {PlanFeatures, PlanFeaturesRelations} from '../models';

export class PlanFeaturesRepository extends DefaultCrudRepository<
  PlanFeatures,
  typeof PlanFeatures.prototype.id,
  PlanFeaturesRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(PlanFeatures, dataSource);
  }
}
