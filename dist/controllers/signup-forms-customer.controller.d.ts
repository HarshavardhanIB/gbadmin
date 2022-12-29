import { Count, Filter, Where } from '@loopback/repository';
import { SignupForms, Customer } from '../models';
import { SignupFormsRepository } from '../repositories';
export declare class SignupFormsCustomerController {
    protected signupFormsRepository: SignupFormsRepository;
    constructor(signupFormsRepository: SignupFormsRepository);
    find(id: number, filter?: Filter<Customer>): Promise<Customer[]>;
    create(id: typeof SignupForms.prototype.id, customer: Omit<Customer, 'id'>): Promise<Customer>;
    patch(id: number, customer: Partial<Customer>, where?: Where<Customer>): Promise<Count>;
    delete(id: number, where?: Where<Customer>): Promise<Count>;
}
