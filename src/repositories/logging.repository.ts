import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {Logging, LoggingRelations} from '../models';

export class LoggingRepository extends DefaultCrudRepository<
  Logging,
  typeof Logging.prototype.id,
  LoggingRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(Logging, dataSource);
  }
}
