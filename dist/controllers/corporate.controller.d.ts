/// <reference types="express" />
import { Request, Response } from '@loopback/rest';
import { BrokerRepository, ContactInformationRepository, CustomerRepository, UsersRepository } from '../repositories';
import { Corporate, FusebillService } from '../services';
import { FileUploadHandler } from "../types";
import { BrokerAdminsRepository } from '../repositories/broker-admins.repository';
export declare class CorporateController {
    BrokerRepository: BrokerRepository;
    private response;
    corporateService: Corporate;
    usersRepository: UsersRepository;
    BrokerAdminsRepository: BrokerAdminsRepository;
    ContactInformationRepository: ContactInformationRepository;
    CustomerRepository: CustomerRepository;
    handler: FileUploadHandler;
    fusebill: FusebillService;
    constructor(BrokerRepository: BrokerRepository, response: Response, corporateService: Corporate, usersRepository: UsersRepository, BrokerAdminsRepository: BrokerAdminsRepository, ContactInformationRepository: ContactInformationRepository, CustomerRepository: CustomerRepository, handler: FileUploadHandler, fusebill: FusebillService);
    brokerDetailsBasedonId(company: string): Promise<Response>;
    signup(request: Request, response: Response): Promise<any>;
    corporateFormConfig(): Promise<void>;
}
