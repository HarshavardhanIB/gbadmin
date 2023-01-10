/// <reference types="express" />
import { Request, Response } from '@loopback/rest';
import { BrokerRepository, ContactInformationRepository, UsersRepository } from '../repositories';
import { Corporate } from '../services';
import { FileUploadHandler } from "../types";
export declare class CorporateController {
    BrokerRepository: BrokerRepository;
    private response;
    corporateService: Corporate;
    usersRepository: UsersRepository;
    ContactInformationRepository: ContactInformationRepository;
    handler: FileUploadHandler;
    constructor(BrokerRepository: BrokerRepository, response: Response, corporateService: Corporate, usersRepository: UsersRepository, ContactInformationRepository: ContactInformationRepository, handler: FileUploadHandler);
    brokerDetailsBasedonId(company: string): Promise<Response>;
    brokerDetails(brokerId: number): Promise<void>;
    signup(request: Request, response: Response): Promise<any>;
}
