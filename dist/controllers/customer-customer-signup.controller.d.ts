import { Count, Filter, Where } from '@loopback/repository';
import { Customer, CustomerSignup } from '../models';
import { CustomerRepository } from '../repositories';
export declare class CustomerCustomerSignupController {
    protected customerRepository: CustomerRepository;
    constructor(customerRepository: CustomerRepository);
    get(id: number, filter?: Filter<CustomerSignup>): Promise<CustomerSignup>;
    create(id: typeof Customer.prototype.id, customerSignup: Omit<CustomerSignup, 'id'>): Promise<CustomerSignup>;
    patch(id: number, customerSignup: Partial<CustomerSignup>, where?: Where<CustomerSignup>): Promise<Count>;
    delete(id: number, where?: Where<CustomerSignup>): Promise<Count>;
}
