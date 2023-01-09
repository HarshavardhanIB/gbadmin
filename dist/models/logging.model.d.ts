import { Entity } from '@loopback/repository';
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
