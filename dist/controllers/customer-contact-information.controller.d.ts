import { Count, Filter, Where } from '@loopback/repository';
import { Customer, ContactInformation } from '../models';
import { CustomerRepository } from '../repositories';
export declare class CustomerContactInformationController {
    protected customerRepository: CustomerRepository;
    constructor(customerRepository: CustomerRepository);
    find(id: number, filter?: Filter<ContactInformation>): Promise<ContactInformation[]>;
    create(id: typeof Customer.prototype.id, contactInformation: Omit<ContactInformation, 'id'>): Promise<ContactInformation>;
    patch(id: number, contactInformation: Partial<ContactInformation>, where?: Where<ContactInformation>): Promise<Count>;
    delete(id: number, where?: Where<ContactInformation>): Promise<Count>;
}
