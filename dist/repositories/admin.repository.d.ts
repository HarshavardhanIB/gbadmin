import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { Admin, AdminRelations } from '../models';
export declare class AdminRepository extends DefaultCrudRepository<Admin, typeof Admin.prototype.id, AdminRelations> {
    constructor(dataSource: GbadminDataSource);
}
