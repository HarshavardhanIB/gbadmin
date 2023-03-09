import { Entity } from '@loopback/repository';
import { Customer } from './customer.model';
import { Broker } from './broker.model';
export declare class Users extends Entity {
    activation?: string;
    block?: boolean;
    companyId?: number;
    deleted?: boolean;
    id?: number;
    lastLogin?: string;
    otpKey?: string;
    otpToken?: string;
    password?: string;
    registrationDate: string;
    role?: string;
    username?: string;
    customer: Customer;
    broker: Broker[];
    [prop: string]: any;
    constructor(data?: Partial<Users>);
}
export interface UsersRelations {
}
export declare type UsersWithRelations = Users & UsersRelations;
