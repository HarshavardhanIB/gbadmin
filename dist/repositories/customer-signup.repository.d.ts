import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { CustomerSignup, CustomerSignupRelations, SignupForms } from '../models';
import { SignupFormsRepository } from './signup-forms.repository';
export declare class CustomerSignupRepository extends DefaultCrudRepository<CustomerSignup, typeof CustomerSignup.prototype.id, CustomerSignupRelations> {
    protected signupFormsRepositoryGetter: Getter<SignupFormsRepository>;
    readonly form: BelongsToAccessor<SignupForms, typeof CustomerSignup.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, signupFormsRepositoryGetter: Getter<SignupFormsRepository>);
}
