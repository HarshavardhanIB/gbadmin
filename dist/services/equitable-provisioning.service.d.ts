import { Customer } from '../models';
import { AitpService } from './aitp.service';
import { CommonProvisioningService } from './common-provisioning.service';
export declare class EquitableProvisioningService {
    protected provision: CommonProvisioningService;
    protected aitp: AitpService;
    constructor(/* Add @inject to inject parameters */ provision: CommonProvisioningService, aitp: AitpService);
    provisionEquitable(customers: Customer[]): Promise<any>;
    provisionEquitableSingle(customer: Customer, equitablePlan: any): Promise<any>;
    terminateEquitableSingle(customer: any): Promise<any>;
}
