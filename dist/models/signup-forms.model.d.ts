import { Entity } from '@loopback/repository';
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
    [prop: string]: any;
    constructor(data?: Partial<SignupForms>);
}
export interface SignupFormsRelations {
}
export declare type SignupFormsWithRelations = SignupForms & SignupFormsRelations;
