import { Count, Filter, Where } from '@loopback/repository';
import { StatesAndProvinces, PlansAvailability } from '../models';
import { StatesAndProvincesRepository } from '../repositories';
export declare class StatesAndProvincesPlansAvailabilityController {
    protected statesAndProvincesRepository: StatesAndProvincesRepository;
    constructor(statesAndProvincesRepository: StatesAndProvincesRepository);
    find(id: number, filter?: Filter<PlansAvailability>): Promise<PlansAvailability[]>;
    create(id: typeof StatesAndProvinces.prototype.id, plansAvailability: Omit<PlansAvailability, 'id'>): Promise<PlansAvailability>;
    patch(id: number, plansAvailability: Partial<PlansAvailability>, where?: Where<PlansAvailability>): Promise<Count>;
    delete(id: number, where?: Where<PlansAvailability>): Promise<Count>;
}
