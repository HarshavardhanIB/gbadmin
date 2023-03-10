import { Entity } from '@loopback/repository';
export declare class Employee extends Entity {
    employeeId?: string;
    firstName: string;
    lastName: string;
    emailId: string;
    occupation: string;
    dateOfHire: string;
    sex: string;
    residentIn: string;
    familyStatus: string;
    phoneNum: number;
    annualIncome: number;
    provienceId: number;
    provienceName: string;
    tier: number;
    [prop: string]: any;
    constructor(data?: Partial<Employee>);
}
