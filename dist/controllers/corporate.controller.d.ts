/// <reference types="express" />
import { Response } from '@loopback/rest';
import { BrokerRepository } from '../repositories';
export declare class CorporateController {
    BrokerRepository: BrokerRepository;
    private response;
    constructor(BrokerRepository: BrokerRepository, response: Response);
    brokerDetailsBasedonId(company: string): Promise<Response>;
    brokerDetails(brokerId: number): Promise<void>;
}
