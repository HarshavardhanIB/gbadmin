import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { ServiceProvider, ServiceProviderRelations } from '../models';
export declare class ServiceProviderRepository extends DefaultCrudRepository<ServiceProvider, typeof ServiceProvider.prototype.id, ServiceProviderRelations> {
    constructor(dataSource: GbadminDataSource);
}
