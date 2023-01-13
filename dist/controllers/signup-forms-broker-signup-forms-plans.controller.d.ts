import { Count, Filter, Where } from '@loopback/repository';
import { SignupForms, BrokerSignupFormsPlans } from '../models';
import { SignupFormsRepository } from '../repositories';
export declare class SignupFormsBrokerSignupFormsPlansController {
    protected signupFormsRepository: SignupFormsRepository;
    constructor(signupFormsRepository: SignupFormsRepository);
    find(id: number, filter?: Filter<BrokerSignupFormsPlans>): Promise<BrokerSignupFormsPlans[]>;
    create(id: typeof SignupForms.prototype.id, brokerSignupFormsPlans: Omit<BrokerSignupFormsPlans, 'id'>): Promise<BrokerSignupFormsPlans>;
    patch(id: number, brokerSignupFormsPlans: Partial<BrokerSignupFormsPlans>, where?: Where<BrokerSignupFormsPlans>): Promise<Count>;
    delete(id: number, where?: Where<BrokerSignupFormsPlans>): Promise<Count>;
}
