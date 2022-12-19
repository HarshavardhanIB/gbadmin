import { Entity } from '@loopback/repository';
export declare class Admin extends Entity {
    email: string;
    id?: number;
    password: string;
    username: string;
    [prop: string]: any;
    constructor(data?: Partial<Admin>);
}
export interface AdminRelations {
}
export declare type AdminWithRelations = Admin & AdminRelations;
