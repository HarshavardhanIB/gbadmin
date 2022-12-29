import { Count, Filter, Where } from '@loopback/repository';
import { Customer, CustomerPlanOptionsValues } from '../models';
import { CustomerRepository } from '../repositories';
export declare class CustomerCustomerPlanOptionsValuesController {
    protected customerRepository: CustomerRepository;
    constructor(customerRepository: CustomerRepository);
    find(id: number, filter?: Filter<CustomerPlanOptionsValues>): Promise<CustomerPlanOptionsValues[]>;
    create(id: typeof Customer.prototype.id, customerPlanOptionsValues: Omit<CustomerPlanOptionsValues, 'id'>): Promise<CustomerPlanOptionsValues>;
    patch(id: number, customerPlanOptionsValues: Partial<CustomerPlanOptionsValues>, where?: Where<CustomerPlanOptionsValues>): Promise<Count>;
    delete(id: number, where?: Where<CustomerPlanOptionsValues>): Promise<Count>;
}
