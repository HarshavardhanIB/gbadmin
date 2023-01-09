import { Entity } from '@loopback/repository';
export declare class EquitablePlanLevelMapping extends Entity {
    classCode?: string;
    className?: string;
    divisionCode?: string;
    divisionName: string;
    id?: number;
    planLevelId?: number;
    stateId?: number;
    [prop: string]: any;
    constructor(data?: Partial<EquitablePlanLevelMapping>);
}
export interface EquitablePlanLevelMappingRelations {
}
export declare type EquitablePlanLevelMappingWithRelations = EquitablePlanLevelMapping & EquitablePlanLevelMappingRelations;
