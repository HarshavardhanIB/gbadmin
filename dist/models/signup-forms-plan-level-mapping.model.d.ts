import { Entity } from '@loopback/repository';
export declare class SignupFormsPlanLevelMapping extends Entity {
    formId: number;
    id?: number;
    planLevelId: number;
    plan_level_id: number;
    form_id?: number;
    [prop: string]: any;
    constructor(data?: Partial<SignupFormsPlanLevelMapping>);
}
export interface SignupFormsPlanLevelMappingRelations {
}
export declare type SignupFormsPlanLevelMappingWithRelations = SignupFormsPlanLevelMapping & SignupFormsPlanLevelMappingRelations;
