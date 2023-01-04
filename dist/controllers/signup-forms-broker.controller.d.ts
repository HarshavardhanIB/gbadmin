import { SignupForms, Broker } from '../models';
import { SignupFormsRepository } from '../repositories';
export declare class SignupFormsBrokerController {
    signupFormsRepository: SignupFormsRepository;
    constructor(signupFormsRepository: SignupFormsRepository);
    getBroker(id: typeof SignupForms.prototype.id): Promise<Broker>;
}
