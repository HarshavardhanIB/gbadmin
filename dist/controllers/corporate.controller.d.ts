/// <reference types="express" />
import { Request, Response } from '@loopback/rest';
import { BrokerAdminsRepository, BrokerRepository, ContactInformationRepository, UsersRepository } from '../repositories';
import { CommonServiceService, Corporate } from '../services';
import { FileUploadHandler } from "../types";
export declare class CorporateController {
    BrokerRepository: BrokerRepository;
    private response;
    corporateService: Corporate;
    usersRepository: UsersRepository;
    BrokerAdminsRepository: BrokerAdminsRepository;
    ContactInformationRepository: ContactInformationRepository;
    handler: FileUploadHandler;
    commonService: CommonServiceService;
    constructor(BrokerRepository: BrokerRepository, response: Response, corporateService: Corporate, usersRepository: UsersRepository, BrokerAdminsRepository: BrokerAdminsRepository, ContactInformationRepository: ContactInformationRepository, handler: FileUploadHandler, commonService: CommonServiceService);
    brokerDetailsBasedonId(company: string): Promise<Response>;
    brokerDetails(brokerId: number): Promise<void>;
    signup(request: Request, response: Response): Promise<any>;
}
