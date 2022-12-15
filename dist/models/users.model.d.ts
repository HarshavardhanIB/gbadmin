/// <reference types="node" />
import { Entity } from '@loopback/repository';
import { Customer } from './customer.model';
export declare class Users extends Entity {
    activation?: string;
    block: boolean;
    companyId?: number;
    deleted?: Buffer;
    id?: number;
    lastLogin?: string;
    otpKey?: string;
    otpToken?: string;
    password?: string;
    registrationDate: string;
    role?: string;
    username?: string;
    customer: Customer;
    [prop: string]: any;
    constructor(data?: Partial<Users>);
}
export interface UsersRelations {
}
export declare type UsersWithRelations = Users & UsersRelations;
