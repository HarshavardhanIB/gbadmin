import { Entity } from '@loopback/repository';
export declare class Roles extends Entity {
    id?: number;
    name: string;
    [prop: string]: any;
    constructor(data?: Partial<Roles>);
}
export interface RolesRelations {
}
export declare type RolesWithRelations = Roles & RolesRelations;
