import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CustomerPlanOptionsValues, CustomerPlanOptionsValuesRelations } from '../models';

export class CustomerPlanOptionsValuesRepository extends DefaultCrudRepository<
  CustomerPlanOptionsValues,
  typeof CustomerPlanOptionsValues.prototype.id,
  CustomerPlanOptionsValuesRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(CustomerPlanOptionsValues, dataSource);
  }
}
