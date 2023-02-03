import { Entity } from '@loopback/repository';
export declare enum Operation {
    INSERT_ONE = "INSERT_ONE",
    INSERT_MANY = "INSERT_MANY",
    UPDATE_ONE = "UPDATE_ONE",
    UPDATE_MANY = "UPDATE_MANY",
    DELETE_ONE = "DELETE_ONE",
    DELETE_MANY = "DELETE_MANY"
}
export declare class Logging extends Entity {
    changedById?: number;
    changedByUsername?: string;
    created?: string;
    id?: number;
    newValue?: string;
    oldValue?: string;
    recordId: string;
    source?: string;
    tableName: string;
    [prop: string]: any;
    constructor(data?: Partial<Logging>);
}
export interface LoggingRelations {
}
export declare type LoggingWithRelations = Logging & LoggingRelations;
