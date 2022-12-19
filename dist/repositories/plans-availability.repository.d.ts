import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { PlansAvailability, PlansAvailabilityRelations } from '../models';
export declare class PlansAvailabilityRepository extends DefaultCrudRepository<PlansAvailability, typeof PlansAvailability.prototype.id, PlansAvailabilityRelations> {
    constructor(dataSource: GbadminDataSource);
}
