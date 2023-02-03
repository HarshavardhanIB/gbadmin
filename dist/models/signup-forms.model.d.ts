import { Entity } from '@loopback/repository';
import { Customer } from './customer.model';
import { SignupFormsPlanLevelMapping } from './signup-forms-plan-level-mapping.model';
export declare class SignupForms extends Entity {
    id?: number;
    alias?: string;
    brokerId: number;
    description?: string;
    formType: string;
    inelligibilityPeriod?: number;
    isDemoForm?: boolean;
    keywords?: string;
    link?: string;
    name?: string;
    notAfter?: string;
    notBefore?: string;
    published?: boolean;
    requireDentalHealthCoverage?: boolean;
    requireSpouseEmail?: boolean;
    title?: string;
    useCreditCardPaymentMethod?: boolean;
    usePadPaymentMethod?: boolean;
    warnRequiredDependantMedicalExam?: boolean;
    customers: Customer[];
    signupFormPlanLevels: SignupFormsPlanLevelMapping[];
    broker_id: number;
    [prop: string]: any;
    constructor(data?: Partial<SignupForms>);
}
export interface SignupFormsRelations {
}
export declare type SignupFormsWithRelations = SignupForms & SignupFormsRelations;
