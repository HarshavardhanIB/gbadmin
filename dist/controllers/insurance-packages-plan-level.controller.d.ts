import { Count, Filter, Where } from '@loopback/repository';
import { InsurancePackages, PlanLevel } from '../models';
import { InsurancePackagesRepository } from '../repositories';
export declare class InsurancePackagesPlanLevelController {
    protected insurancePackagesRepository: InsurancePackagesRepository;
    constructor(insurancePackagesRepository: InsurancePackagesRepository);
    find(id: number, filter?: Filter<PlanLevel>): Promise<PlanLevel[]>;
    create(id: typeof InsurancePackages.prototype.id, planLevel: Omit<PlanLevel, 'id'>): Promise<PlanLevel>;
    patch(id: number, planLevel: Partial<PlanLevel>, where?: Where<PlanLevel>): Promise<Count>;
    delete(id: number, where?: Where<PlanLevel>): Promise<Count>;
}
