import { Entity } from '@loopback/repository';
export declare class ServiceProvider extends Entity {
    adminLink?: string;
    contactId?: number;
    description?: string;
    id?: number;
    name?: string;
    password?: string;
    username?: string;
    [prop: string]: any;
    constructor(data?: Partial<ServiceProvider>);
}
export interface ServiceProviderRelations {
}
export declare type ServiceProviderWithRelations = ServiceProvider & ServiceProviderRelations;
