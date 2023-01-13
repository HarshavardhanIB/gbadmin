import { Entity } from '@loopback/repository';
import { Customer } from './customer.model';
import { SignupFormsPlanLevelMapping } from './signup-forms-plan-level-mapping.model';
import { BrokerSignupFormsPlans } from './broker-signup-forms-plans.model';
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
    customers: Customer[];
    signupFormsPlanLevelMappings: SignupFormsPlanLevelMapping[];
    broker_id: number;
    brokerSignupFormsPlans: BrokerSignupFormsPlans[];
    [prop: string]: any;
    constructor(data?: Partial<SignupForms>);
}
export interface SignupFormsRelations {
}
export declare type SignupFormsWithRelations = SignupForms & SignupFormsRelations;
