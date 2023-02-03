import { Customer } from '../models/customer.model';
import { AitpService } from './aitp.service';
import { CommonProvisioningService } from './common-provisioning.service';
import { EmailService } from './email.service';
import { MailHelperService } from './mail-helper.service';
export declare class CandooHealthProvisioningService {
    protected provision: CommonProvisioningService;
    protected aitp: AitpService;
    mail: EmailService;
    mailHelper: MailHelperService;
    constructor(provision: CommonProvisioningService, aitp: AitpService, mail: EmailService, mailHelper: MailHelperService);
    provisionCandooRegistration(customers: Customer[]): Promise<any>;
    provisionCandooTermination(customers: Customer[]): Promise<any>;
    provisionExecutiveSingle(customer: Customer, executivePlan: any): Promise<any>;
    terminateExecutiveSingle(customer: any): Promise<any>;
    executiveUsersProvisionProcess(customers: any, result: any, success: boolean, scenario: string, registerTermination: boolean): Promise<number>;
}
