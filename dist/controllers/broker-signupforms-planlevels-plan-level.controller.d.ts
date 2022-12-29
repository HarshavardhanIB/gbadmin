import { BrokerSignupformsPlanlevels, PlanLevel } from '../models';
import { BrokerSignupformsPlanlevelsRepository } from '../repositories';
export declare class BrokerSignupformsPlanlevelsPlanLevelController {
    brokerSignupformsPlanlevelsRepository: BrokerSignupformsPlanlevelsRepository;
    constructor(brokerSignupformsPlanlevelsRepository: BrokerSignupformsPlanlevelsRepository);
    getPlanLevel(id: typeof BrokerSignupformsPlanlevels.prototype.id): Promise<PlanLevel>;
}
