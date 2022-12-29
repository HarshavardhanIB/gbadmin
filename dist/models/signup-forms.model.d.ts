import { Entity } from '@loopback/repository';
import { BrokerSignupformsPlanlevels } from './broker-signupforms-planlevels.model';
import { Customer } from './customer.model';
export declare class SignupForms extends Entity {
    alias?: string;
    brokerId: number;
    description?: string;
    formType: string;
    id?: number;
    inelligibilityPeriod?: number;
    isDemoForm: boolean;
    keywords?: string;
    link?: string;
    name?: string;
    notAfter?: string;
    notBefore?: string;
    published?: boolean;
    requireDentalHealthCoverage: boolean;
    requireSpouseEmail: boolean;
    title?: string;
    useCreditCardPaymentMethod: boolean;
    usePadPaymentMethod: boolean;
    warnRequiredDependantMedicalExam: boolean;
    broker_id?: number;
    signupFormPlanLevels: BrokerSignupformsPlanlevels[];
    customers: Customer[];
    [prop: string]: any;
    constructor(data?: Partial<SignupForms>);
}
export interface SignupFormsRelations {
}
export declare type SignupFormsWithRelations = SignupForms & SignupFormsRelations;
