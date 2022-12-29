import { Count, Filter, Where } from '@loopback/repository';
import { Broker, SignupForms } from '../models';
import { BrokerRepository } from '../repositories';
export declare class BrokerSignupFormsController {
    protected brokerRepository: BrokerRepository;
    constructor(brokerRepository: BrokerRepository);
    find(id: number, filter?: Filter<SignupForms>): Promise<SignupForms[]>;
    create(id: typeof Broker.prototype.id, signupForms: Omit<SignupForms, 'id'>): Promise<SignupForms>;
    patch(id: number, signupForms: Partial<SignupForms>, where?: Where<SignupForms>): Promise<Count>;
    delete(id: number, where?: Where<SignupForms>): Promise<Count>;
}
