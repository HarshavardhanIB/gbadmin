import { DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { Logging, LoggingRelations } from '../models';
export declare class LoggingRepository extends DefaultCrudRepository<Logging, typeof Logging.prototype.id, LoggingRelations> {
    constructor(dataSource: GroupBenefitzDataSource);
}
