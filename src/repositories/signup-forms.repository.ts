import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GbadminDataSource} from '../datasources';
import {SignupForms, SignupFormsRelations} from '../models';

export class SignupFormsRepository extends DefaultCrudRepository<
  SignupForms,
  typeof SignupForms.prototype.id,
  SignupFormsRelations
> {
  constructor(
    @inject('datasources.gbadmin') dataSource: GbadminDataSource,
  ) {
    super(SignupForms, dataSource);
  }
}
