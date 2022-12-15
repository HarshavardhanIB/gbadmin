import { Count, Filter, Where } from '@loopback/repository';
import { Customer, CustomerRelatives } from '../models';
import { CustomerRepository } from '../repositories';
export declare class CustomerCustomerRelativesController {
    protected customerRepository: CustomerRepository;
    constructor(customerRepository: CustomerRepository);
    find(id: number, filter?: Filter<CustomerRelatives>): Promise<CustomerRelatives[]>;
    create(id: typeof Customer.prototype.id, customerRelatives: Omit<CustomerRelatives, 'id'>): Promise<CustomerRelatives>;
    patch(id: number, customerRelatives: Partial<CustomerRelatives>, where?: Where<CustomerRelatives>): Promise<Count>;
    delete(id: number, where?: Where<CustomerRelatives>): Promise<Count>;
}
