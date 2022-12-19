import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {PlansOptionsReporting, PlansOptionsReportingRelations} from '../models';

export class PlansOptionsReportingRepository extends DefaultCrudRepository<
  PlansOptionsReporting,
  typeof PlansOptionsReporting.prototype.id,
  PlansOptionsReportingRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(PlansOptionsReporting, dataSource);
  }
}
