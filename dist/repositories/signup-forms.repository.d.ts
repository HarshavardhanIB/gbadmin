import { DefaultCrudRepository } from '@loopback/repository';
import { GbadminDataSource } from '../datasources';
import { SignupForms, SignupFormsRelations } from '../models';
export declare class SignupFormsRepository extends DefaultCrudRepository<SignupForms, typeof SignupForms.prototype.id, SignupFormsRelations> {
    constructor(dataSource: GbadminDataSource);
}
