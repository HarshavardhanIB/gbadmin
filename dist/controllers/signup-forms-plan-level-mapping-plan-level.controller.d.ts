import { SignupFormsPlanLevelMapping, PlanLevel } from '../models';
import { SignupFormsPlanLevelMappingRepository } from '../repositories';
export declare class SignupFormsPlanLevelMappingPlanLevelController {
    signupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository;
    constructor(signupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository);
    getPlanLevel(id: typeof SignupFormsPlanLevelMapping.prototype.id): Promise<PlanLevel>;
}
