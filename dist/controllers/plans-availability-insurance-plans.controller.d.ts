import { PlansAvailability, InsurancePlans } from '../models';
import { PlansAvailabilityRepository } from '../repositories';
export declare class PlansAvailabilityInsurancePlansController {
    plansAvailabilityRepository: PlansAvailabilityRepository;
    constructor(plansAvailabilityRepository: PlansAvailabilityRepository);
    getInsurancePlans(id: typeof PlansAvailability.prototype.id): Promise<InsurancePlans>;
}
