import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { CustomerSignup, CustomerSignupRelations, SignupForms } from '../models';
import { SignupFormsRepository } from './signup-forms.repository';

export class CustomerSignupRepository extends DefaultCrudRepository<
  CustomerSignup,
  typeof CustomerSignup.prototype.id,
  CustomerSignupRelations
> {
public readonly form: BelongsToAccessor<SignupForms, typeof CustomerSignup.prototype.id>;
  constructor(
     @inject('datasources.groupBenefitz') dataSource: GroupBenefitzDataSource, @repository.getter('SignupFormsRepository') protected signupFormsRepositoryGetter: Getter<SignupFormsRepository>,
  ) {
    super(CustomerSignup, dataSource);
   this.form = this.createBelongsToAccessorFor('form', signupFormsRepositoryGetter,);
    this.registerInclusionResolver('form', this.form.inclusionResolver);
  }
}
