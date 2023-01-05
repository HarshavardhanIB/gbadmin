import { Count, Filter, Where } from '@loopback/repository';
import { PlanLevel, InsurancePlans } from '../models';
import { PlanLevelRepository } from '../repositories';
export declare class PlanLevelInsurancePlansController {
    protected planLevelRepository: PlanLevelRepository;
    constructor(planLevelRepository: PlanLevelRepository);
    find(id: number, filter?: Filter<InsurancePlans>): Promise<InsurancePlans[]>;
    create(id: typeof PlanLevel.prototype.id, insurancePlans: Omit<InsurancePlans, 'id'>): Promise<InsurancePlans>;
    patch(id: number, insurancePlans: Partial<InsurancePlans>, where?: Where<InsurancePlans>): Promise<Count>;
    delete(id: number, where?: Where<InsurancePlans>): Promise<Count>;
}
