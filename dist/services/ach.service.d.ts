import { HttpService } from './http.service';
export declare class AchService {
    protected http: HttpService;
    constructor(/* Add @inject to inject parameters */ http: HttpService);
    createCustomer(input: any): Promise<any>;
    createCustomerNoresponse(input: any): Promise<void>;
}
