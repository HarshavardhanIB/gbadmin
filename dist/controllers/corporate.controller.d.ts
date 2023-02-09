/// <reference types="express" />
import { Request, Response } from '@loopback/rest';
import { BankCodesRepository, BrokerRepository, ContactInformationRepository, CustomerRepository, FinancialInstitutionsRepository, FinancialInstitutionsRoutingNumbersRepository, InsurancePlansRepository, PlansAvailabilityRepository, StatesAndProvincesRepository, UsersRepository } from '../repositories';
import { AchService, Corporate, FusebillService, RegistrationServiceService } from '../services';
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
    registrationService: RegistrationServiceService;
    ach: AchService;
    banksCodesRepository: BankCodesRepository;
    banksRepository: FinancialInstitutionsRepository;
    branchesRepository: FinancialInstitutionsRoutingNumbersRepository;
    StatesAndProvincesRepository: StatesAndProvincesRepository;
    InsurancePlansRepository: InsurancePlansRepository;
    PlansAvailabilityRepository: PlansAvailabilityRepository;
    constructor(BrokerRepository: BrokerRepository, response: Response, corporateService: Corporate, usersRepository: UsersRepository, BrokerAdminsRepository: BrokerAdminsRepository, ContactInformationRepository: ContactInformationRepository, CustomerRepository: CustomerRepository, handler: FileUploadHandler, fusebill: FusebillService, registrationService: RegistrationServiceService, ach: AchService, banksCodesRepository: BankCodesRepository, banksRepository: FinancialInstitutionsRepository, branchesRepository: FinancialInstitutionsRoutingNumbersRepository, StatesAndProvincesRepository: StatesAndProvincesRepository, InsurancePlansRepository: InsurancePlansRepository, PlansAvailabilityRepository: PlansAvailabilityRepository);
    brokerDetailsBasedonId(company: string): Promise<Response>;
    signup(request: Request, response: Response): Promise<any>;
    corporateFormConfig(): Promise<Response<any, Record<string, any>>>;
    customerBankDetailsRegister(request: Request, response: Response): Promise<Response>;
    customerBankVerification(request: any): Promise<Response>;
    plans(stateId: number): Promise<(import("../models").PlansAvailability & import("../models").PlansAvailabilityRelations)[] | undefined>;
}
