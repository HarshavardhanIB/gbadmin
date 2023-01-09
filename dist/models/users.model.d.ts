import { Entity } from '@loopback/repository';
export declare class Users extends Entity {
    activation?: string;
    block: boolean;
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
    [prop: string]: any;
    constructor(data?: Partial<Users>);
}
export interface UsersRelations {
}
export declare type UsersWithRelations = Users & UsersRelations;
