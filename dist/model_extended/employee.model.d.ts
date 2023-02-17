import { Entity } from '@loopback/repository';
export declare class Employee extends Entity {
    employeeId?: number;
    firstName: string;
    lastName: string;
    emailId: string;
    occupation: string;
    dateOfHire: string;
    sex: string;
    residentIn: string;
    familyStatus: string;
    phoneNum: number;
    walletLimit: number;
    provienceId: number;
    provienceName: string;
    [prop: string]: any;
    constructor(data?: Partial<Employee>);
}
