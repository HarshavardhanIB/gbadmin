import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { GroupBenefitzDataSource } from '../datasources';
import { CustomerRelatives, CustomerRelativesRelations, Customer } from '../models';
import { CustomerRepository } from './customer.repository';
export declare class CustomerRelativesRepository extends DefaultCrudRepository<CustomerRelatives, typeof CustomerRelatives.prototype.id, CustomerRelativesRelations> {
    protected customerRepositoryGetter: Getter<CustomerRepository>;
    readonly customer: BelongsToAccessor<Customer, typeof CustomerRelatives.prototype.id>;
    constructor(dataSource: GroupBenefitzDataSource, customerRepositoryGetter: Getter<CustomerRepository>);
}
