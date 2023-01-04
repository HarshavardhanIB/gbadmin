import { Count, Filter, Where } from '@loopback/repository';
import { SignupForms, SignupFormsPlanLevelMapping } from '../models';
import { SignupFormsRepository } from '../repositories';
export declare class SignupFormsSignupFormsPlanLevelMappingController {
    protected signupFormsRepository: SignupFormsRepository;
    constructor(signupFormsRepository: SignupFormsRepository);
    find(id: number, filter?: Filter<SignupFormsPlanLevelMapping>): Promise<SignupFormsPlanLevelMapping[]>;
    create(id: typeof SignupForms.prototype.id, signupFormsPlanLevelMapping: Omit<SignupFormsPlanLevelMapping, 'id'>): Promise<SignupFormsPlanLevelMapping>;
    patch(id: number, signupFormsPlanLevelMapping: Partial<SignupFormsPlanLevelMapping>, where?: Where<SignupFormsPlanLevelMapping>): Promise<Count>;
    delete(id: number, where?: Where<SignupFormsPlanLevelMapping>): Promise<Count>;
}
