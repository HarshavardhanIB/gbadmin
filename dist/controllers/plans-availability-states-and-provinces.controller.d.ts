import { PlansAvailability, StatesAndProvinces } from '../models';
import { PlansAvailabilityRepository } from '../repositories';
export declare class PlansAvailabilityStatesAndProvincesController {
    plansAvailabilityRepository: PlansAvailabilityRepository;
    constructor(plansAvailabilityRepository: PlansAvailabilityRepository);
    getStatesAndProvinces(id: typeof PlansAvailability.prototype.id): Promise<StatesAndProvinces>;
}
