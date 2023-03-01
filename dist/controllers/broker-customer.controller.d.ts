import { Count, Filter, Where } from '@loopback/repository';
import { Broker, Customer } from '../models';
import { BrokerRepository } from '../repositories';
export declare class BrokerCustomerController {
    protected brokerRepository: BrokerRepository;
    constructor(brokerRepository: BrokerRepository);
    find(id: number, filter?: Filter<Customer>): Promise<Customer[]>;
    create(id: typeof Broker.prototype.id, customer: Omit<Customer, 'id'>): Promise<Customer>;
    patch(id: number, customer: Partial<Customer>, where?: Where<Customer>): Promise<Count>;
    delete(id: number, where?: Where<Customer>): Promise<Count>;
}
