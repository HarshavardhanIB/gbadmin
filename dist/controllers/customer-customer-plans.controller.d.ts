import { Count, Filter, Where } from '@loopback/repository';
import { Customer, CustomerPlans } from '../models';
import { CustomerRepository } from '../repositories';
export declare class CustomerCustomerPlansController {
    protected customerRepository: CustomerRepository;
    constructor(customerRepository: CustomerRepository);
    find(id: number, filter?: Filter<CustomerPlans>): Promise<CustomerPlans[]>;
    create(id: typeof Customer.prototype.id, customerPlans: Omit<CustomerPlans, 'id'>): Promise<CustomerPlans>;
    patch(id: number, customerPlans: Partial<CustomerPlans>, where?: Where<CustomerPlans>): Promise<Count>;
    delete(id: number, where?: Where<CustomerPlans>): Promise<Count>;
}
