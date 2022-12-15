import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { PlansOptionsReporting, PlansOptionsReportingRelations } from '../models';
export declare class PlansOptionsReportingRepository extends DefaultCrudRepository<PlansOptionsReporting, typeof PlansOptionsReporting.prototype.id, PlansOptionsReportingRelations> {
    constructor(dataSource: GbadminDataSource);
}
