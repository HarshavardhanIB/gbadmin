import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { CustomerPlanOptionsValues, CustomerPlanOptionsValuesRelations } from '../models';
export declare class CustomerPlanOptionsValuesRepository extends DefaultCrudRepository<CustomerPlanOptionsValues, typeof CustomerPlanOptionsValues.prototype.id, CustomerPlanOptionsValuesRelations> {
    constructor(dataSource: GbadminDataSource);
}
