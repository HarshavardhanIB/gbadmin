/// <reference types="express" />
import { Response } from "@loopback/rest";
import { BrokerRepository, CustomerRepository } from "../repositories";
import { Corporate } from "../services";
export declare class CaluclationsController {
    brokerRepository: BrokerRepository;
    corporateService: Corporate;
    customerRepository: CustomerRepository;
    private response;
    constructor(brokerRepository: BrokerRepository, corporateService: Corporate, customerRepository: CustomerRepository, response: Response);
    customerTierUpdate(): Promise<void>;
}
