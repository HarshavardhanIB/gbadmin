import { Customer } from '../models';
import { AitpService } from './aitp.service';
import { CommonProvisioningService } from './common-provisioning.service';
export declare class GreenshieldProvisioningService {
    protected provision: CommonProvisioningService;
    protected aitp: AitpService;
    constructor(/* Add @inject to inject parameters */ provision: CommonProvisioningService, aitp: AitpService);
    provisionGreenshield(customers: Customer[]): Promise<any>;
    provisionGreenshieldSingle(customer: Customer, greenshieldPlan: any): Promise<any>;
    terminateGreenshieldSingle(customer: any): Promise<any>;
}
