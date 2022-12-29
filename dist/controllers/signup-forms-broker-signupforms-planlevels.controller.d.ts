import { Count, Filter, Where } from '@loopback/repository';
import { SignupForms, BrokerSignupformsPlanlevels } from '../models';
import { SignupFormsRepository } from '../repositories';
export declare class SignupFormsBrokerSignupformsPlanlevelsController {
    protected signupFormsRepository: SignupFormsRepository;
    constructor(signupFormsRepository: SignupFormsRepository);
    find(id: number, filter?: Filter<BrokerSignupformsPlanlevels>): Promise<BrokerSignupformsPlanlevels[]>;
    create(id: typeof SignupForms.prototype.id, brokerSignupformsPlanlevels: Omit<BrokerSignupformsPlanlevels, 'id'>): Promise<BrokerSignupformsPlanlevels>;
    patch(id: number, brokerSignupformsPlanlevels: Partial<BrokerSignupformsPlanlevels>, where?: Where<BrokerSignupformsPlanlevels>): Promise<Count>;
    delete(id: number, where?: Where<BrokerSignupformsPlanlevels>): Promise<Count>;
}
