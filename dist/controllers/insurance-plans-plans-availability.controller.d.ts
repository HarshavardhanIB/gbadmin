import { Count, Filter, Where } from '@loopback/repository';
import { InsurancePlans, PlansAvailability } from '../models';
import { InsurancePlansRepository } from '../repositories';
export declare class InsurancePlansPlansAvailabilityController {
    protected insurancePlansRepository: InsurancePlansRepository;
    constructor(insurancePlansRepository: InsurancePlansRepository);
    find(id: number, filter?: Filter<PlansAvailability>): Promise<PlansAvailability[]>;
    create(id: typeof InsurancePlans.prototype.id, plansAvailability: Omit<PlansAvailability, 'id'>): Promise<PlansAvailability>;
    patch(id: number, plansAvailability: Partial<PlansAvailability>, where?: Where<PlansAvailability>): Promise<Count>;
    delete(id: number, where?: Where<PlansAvailability>): Promise<Count>;
}
