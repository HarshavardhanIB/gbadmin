import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { Roles, RolesRelations } from '../models';
export declare class RolesRepository extends DefaultCrudRepository<Roles, typeof Roles.prototype.id, RolesRelations> {
    constructor(dataSource: GbadminDataSource);
}
