/// <reference types="express" />
import { Request, Response } from "@loopback/rest";
import { BrokerRepository, BrokerLicensedStatesAndProvincesRepository, InsurancePlansRepository, SignupFormsRepository, BrokerSignupFormsPlansRepository, StatesAndProvincesRepository, SignupFormsPlanLevelMappingRepository, TieredRebatesDataRepository, TieredRebatesRepository, UsersRepository, ContactInformationRepository, CustomerSignupRepository, CustomerRepository, PlanLevelRepository, BrokerEoInsuranceRepository, InsurancePackagesRepository, PlansAvailabilityRepository } from '../repositories';
import { FileUploadHandler } from "../types";
import { BrokerEoInsurance, ContactInformation } from "../models";
import { BrokerService, HttpService, ResizeimgService } from "../services";
export declare class BrokerController {
    BrokerRepository: BrokerRepository;
    BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository;
    BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository;
    SignupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository;
    TieredRebatesDataRepository: TieredRebatesDataRepository;
    TieredRebatesRepository: TieredRebatesRepository;
    UsersRepository: UsersRepository;
    ContactInformationRepository: ContactInformationRepository;
    SignupFormsRepository: SignupFormsRepository;
    StatesAndProvincesRepository: StatesAndProvincesRepository;
    CustomerSignupRepository: CustomerSignupRepository;
    CustomerRepository: CustomerRepository;
    InsurancePlansRepository: InsurancePlansRepository;
    PlanLevelRepository: PlanLevelRepository;
    BrokerEoInsuranceRepository: BrokerEoInsuranceRepository;
    private response;
    handler: FileUploadHandler;
    http: HttpService;
    img: ResizeimgService;
    bs: BrokerService;
    insurancePackages: InsurancePackagesRepository;
    plansAvalibility: PlansAvailabilityRepository;
    constructor(BrokerRepository: BrokerRepository, BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository, BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository, SignupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository, TieredRebatesDataRepository: TieredRebatesDataRepository, TieredRebatesRepository: TieredRebatesRepository, UsersRepository: UsersRepository, ContactInformationRepository: ContactInformationRepository, SignupFormsRepository: SignupFormsRepository, StatesAndProvincesRepository: StatesAndProvincesRepository, CustomerSignupRepository: CustomerSignupRepository, CustomerRepository: CustomerRepository, InsurancePlansRepository: InsurancePlansRepository, PlanLevelRepository: PlanLevelRepository, BrokerEoInsuranceRepository: BrokerEoInsuranceRepository, response: Response, handler: FileUploadHandler, http: HttpService, img: ResizeimgService, bs: BrokerService, insurancePackages: InsurancePackagesRepository, plansAvalibility: PlansAvailabilityRepository);
    brokerCount(): Promise<Response>;
    getBroker(): Promise<any>;
    brokerDetailsBasedonId(id: number): Promise<any>;
    custmerCount(id: number): Promise<any>;
    static newBroker(request: Request, method: string, others: any): Promise<void>;
    brokerLogoUpload(broker_id: number, resize: boolean, request: Request, response: Response): Promise<any>;
    broker_registration(request: Request, response: Response): Promise<Response>;
    broker_create_form(brokerId: number, apiRequest: any): Promise<Response>;
    checkAndGenerateNewFormLink(formLink: string, userid: number): Promise<string>;
    deleteForm(formId: number): Promise<any>;
    deleteBrokerForm(Brokerid: number): Promise<any>;
    formConfig(formLink?: string, lang?: string): Promise<Response>;
    modifyForm(formid: number, requestBody: {
        newType: string;
        planlevel?: Array<number>;
        oldType: string;
    }): Promise<Response>;
    updateContact(id: number, ContactInformation: Omit<ContactInformation, 'id'>): Promise<any>;
    updateLiceceState(brokerId: number, requestBody: {
        states: Array<number>;
    }): Promise<any>;
    updateEO(brokerId: number, BrokerEoInsurance: Omit<BrokerEoInsurance, 'id'>): Promise<any>;
    updateLiceceNum(brokerId: number, requestBody: {
        licenceNum: string;
    }): Promise<any>;
    deleteBroker(brokerId: number): Promise<Response<any, Record<string, any>>>;
    emailChange(brokerId: number, requestBody: {
        newMailid: string;
    }): Promise<Response<any, Record<string, any>>>;
    brokerUpdate(request: Request, response: Response): Promise<Response>;
    formeConfig(): Promise<Response>;
    planId(apiRequest: any): Promise<any>;
}
