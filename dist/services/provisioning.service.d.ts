import { Customer } from '../models';
import { ContactInformationRepository, CustomerContactInfoRepository, CustomerPlansRepository, CustomerRepository } from '../repositories';
import { CandooHealthProvisioningService } from './candoo-health-provisioning.service';
import { FusebillService } from './fusebill.service';
import { GreenshieldProvisioningService } from './greenshield-provisioning.service';
export declare class ProvisioningService {
    customerRepository: CustomerRepository;
    contactInfoRepository: ContactInformationRepository;
    customerContactInfoRepository: CustomerContactInfoRepository;
    customerPlansRepository: CustomerPlansRepository;
    fusebill: FusebillService;
    greenshieldProvisioning: GreenshieldProvisioningService;
    exec: CandooHealthProvisioningService;
    constructor(customerRepository: CustomerRepository, contactInfoRepository: ContactInformationRepository, customerContactInfoRepository: CustomerContactInfoRepository, customerPlansRepository: CustomerPlansRepository, fusebill: FusebillService, greenshieldProvisioning: GreenshieldProvisioningService, exec: CandooHealthProvisioningService);
    provisionAll(customers: Customer[]): Promise<any>;
    greenshieldUserRegistartion(customer: any, greenshieldPlans: any): Promise<any>;
    greenshieldUserTermination(customer: any): Promise<any>;
    executiveUserRegistartion(customer: any, executivePlansx: any): Promise<any>;
}
