import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false } })
export class Employee extends Entity {
    @property({
        type: 'string',
    })
    employeeId?: string;
    @property({
        type: 'string',
        required: true,
        length: 45
    })
    firstName: string;
    @property({
        type: 'string',
        required: true,
        length: 45
    })
    lastName: string;
    @property({
        type: 'string',
        required: true,
        length: 45,
        format: 'email',
    })
    emailId: string;
    @property({
        type: 'string',
        required: true,
        length: 200,
    })
    occupation: string;
    @property({
        type: 'date',
        required: true,
    })
    dateOfHire: string;
    @property({
        type:'string',
        require:true
    })
    sex:string;
    @property({
        type:'string',
        require:true
    })
    residentIn:string;
    @property({
        type:'string',
        require:false
    })
    familyStatus:string;
    @property({
        type:'number',
        require:false,
        length: 10,
    })
    phoneNum:number;
    @property({
        type:'number',
        require:true,
    })
    walletLimit:number;
    @property({
        type:'number',
        require:true,
    })
    provienceId:number;
    @property({
        type:'string',
        require:true,
    })
    provienceName:string;
    @property({
        type:'number',
        require:false
    })
    tier:number;
    @property({
        type:'boolean',
        require:true,
    })
    fuseBillCustomerCreation:boolean
    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Employee>) {
        super(data);
    }
}

