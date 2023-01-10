import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {ServiceProvider, ServiceProviderRelations} from '../models';

export class ServiceProviderRepository extends DefaultCrudRepository<
  ServiceProvider,
  typeof ServiceProvider.prototype.id,
  ServiceProviderRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(ServiceProvider, dataSource);
  }
}
