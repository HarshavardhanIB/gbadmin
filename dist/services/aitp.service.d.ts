import { CustomerRepository } from '../repositories';
import { HttpService } from './http.service';
export declare class AitpService {
    protected http: HttpService;
    private customerRepo;
    constructor(/* Add @inject to inject parameters */ http: HttpService, customerRepo: CustomerRepository);
    signin(): Promise<any>;
    execute(): Promise<void>;
    getExecutionId(token: string): Promise<any>;
    executeWithExternalData(data: any, token: string): Promise<any>;
    mainExecution(data: any): Promise<{
        single: any;
        couple: any;
        family: any;
    }>;
    soleExecution(data: any, registartion: boolean, service: string): Promise<any>;
    checkLogDataGS(data: any, customerId: number, registration: boolean, coverage: string): Promise<any>;
    getMemebershipId(response: any): Promise<any>;
    /***EQ */
    checkLogDataEQ(data: any, customerId: number, registration: boolean, coverage: string): Promise<any>;
    getCertId(response: any): Promise<any>;
    checkEQterm(responses: any): Promise<boolean>;
    /***CandooHealth - Executive */
    checkLogDataEXEC(data: any, datasets: number, registration: boolean, coverage: string): Promise<{
        executiveRegistration: boolean;
        executiveRegistrationDatasets: any;
        executiveTermination?: undefined;
        executiveTerminationDatasets?: undefined;
    } | {
        executiveTermination: boolean;
        executiveTerminationDatasets: any;
        executiveRegistration?: undefined;
        executiveRegistrationDatasets?: undefined;
    }>;
}
