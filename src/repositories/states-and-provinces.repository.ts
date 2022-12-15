import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {StatesAndProvinces, StatesAndProvincesRelations} from '../models';

export class StatesAndProvincesRepository extends DefaultCrudRepository<
  StatesAndProvinces,
  typeof StatesAndProvinces.prototype.id,
  StatesAndProvincesRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(StatesAndProvinces, dataSource);
  }
}
