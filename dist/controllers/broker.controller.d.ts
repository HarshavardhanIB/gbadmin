/// <reference types="express" />
import { Request, Response } from "@loopback/rest";
import { BrokerRepository, BrokerLicensedStatesAndProvincesRepository, InsurancePlansRepository, SignupFormsRepository, StatesAndProvincesRepository, SignupFormsPlanLevelMappingRepository, UsersRepository, ContactInformationRepository, CustomerSignupRepository, CustomerRepository, PlanLevelRepository, BrokerEoInsuranceRepository, InsurancePackagesRepository, PlansAvailabilityRepository } from '../repositories';
import { FileUploadHandler } from "../types";
import { BrokerEoInsurance, ContactInformation } from "../models";
import { BrokerService, HttpService, LogService, ResizeimgService } from "../services";
import { BrokerAdminsRepository } from "../repositories/broker-admins.repository";
export declare class BrokerController {
    brokerRepository: BrokerRepository;
    brokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository;
    signupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository;
    usersRepository: UsersRepository;
    contactInformationRepository: ContactInformationRepository;
    signupFormsRepository: SignupFormsRepository;
    StatesAndProvincesRepository: StatesAndProvincesRepository;
    customerSignupRepository: CustomerSignupRepository;
    customerRepository: CustomerRepository;
    insurancePlansRepository: InsurancePlansRepository;
    planLevelRepository: PlanLevelRepository;
    brokerEoInsuranceRepository: BrokerEoInsuranceRepository;
    private response;
    handler: FileUploadHandler;
    http: HttpService;
    img: ResizeimgService;
    bs: BrokerService;
    insurancePackages: InsurancePackagesRepository;
    plansAvalibility: PlansAvailabilityRepository;
    brokerAdminsRepository: BrokerAdminsRepository;
    logs: LogService;
    constructor(brokerRepository: BrokerRepository, brokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository, signupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository, usersRepository: UsersRepository, contactInformationRepository: ContactInformationRepository, signupFormsRepository: SignupFormsRepository, StatesAndProvincesRepository: StatesAndProvincesRepository, customerSignupRepository: CustomerSignupRepository, customerRepository: CustomerRepository, insurancePlansRepository: InsurancePlansRepository, planLevelRepository: PlanLevelRepository, brokerEoInsuranceRepository: BrokerEoInsuranceRepository, response: Response, handler: FileUploadHandler, http: HttpService, img: ResizeimgService, bs: BrokerService, insurancePackages: InsurancePackagesRepository, plansAvalibility: PlansAvailabilityRepository, brokerAdminsRepository: BrokerAdminsRepository, logs: LogService);
    brokerCount(): Promise<Response>;
    getBroker(): Promise<any>;
    brokerDetailsBasedonId(id: number): Promise<any>;
    custmerCount(id: number): Promise<any>;
    static newBroker(request: Request, method: string, others: any): Promise<void>;
    brokerLogoUpload(broker_id: number, resize: boolean, request: Request, response: Response): Promise<any>;
    checkAndGenerateNewFormLink(formLink: string, userid: number): Promise<string>;
    deleteForm(formId: number): Promise<any>;
    deleteBrokerForm(Brokerid: number): Promise<any>;
    formConfig(formLink?: string, lang?: string): Promise<Response>;
    updateContact(id: number, ContactInformation: Omit<ContactInformation, 'id'>): Promise<any>;
    updateLiceceState(brokerId: number, requestBody: any): Promise<any>;
    updateEOI(brokerId: number, BrokerEoInsurance: Omit<BrokerEoInsurance, 'id'>): Promise<any>;
    deleteBroker(brokerId: number): Promise<Response<any, Record<string, any>>>;
    emailChange(brokerId: number, requestBody: {
        newMailid: string;
    }): Promise<Response<any, Record<string, any>>>;
    brokerUpdate(request: Request, response: Response): Promise<Response>;
    formeConfig(): Promise<Response>;
    planlevels(apiRequest: any): Promise<any>;
    broker_create_form_new(brokerId: number, apiRequest: any): Promise<Response>;
    broker_create_form_new_with_salesTrackingCode(brokerIdOrName: any, idOrName: boolean, trackingCode: number, apiRequest: any): Promise<Response>;
    formDetails(formId: number): Promise<Response>;
    addOrRemoveForm(formid: number, requestBody: any): Promise<Response>;
    brokerDetails(id: number): Promise<any>;
    brokerFormDetails(brokerid: number): Promise<any>;
    brokerFormbasedonIdDetails(brokerid: number, formId: number): Promise<any>;
    customersBasedonbrokerId(brokerid: number): Promise<any>;
    customerdetailsBasedonbrokerIdandCustomerId(brokerid: number, customerId: number): Promise<any>;
    customerDetailsBasedOnBrokerIdandFormId(brokerid: number, customerId: number, formId: number): Promise<any>;
    search(apiRequest: any): Promise<any>;
    broker_registration(request: Request, response: Response): Promise<Response>;
    app(): Promise<any>;
    formLogo(request: Request, response: Response, formId: number): Promise<Response<any, Record<string, any>>>;
    formDisclouser(request: Request, response: Response, formId: number): Promise<Response<any, Record<string, any>>>;
    brokerDisclouserUpdate(request: Request, response: Response, brokerId: number): Promise<Response<any, Record<string, any>>>;
}
