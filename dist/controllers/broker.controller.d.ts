/// <reference types="express" />
import { Request, Response } from "@loopback/rest";
import { BrokerRepository, BrokerLicensedStatesAndProvincesRepository, InsurancePlansRepository, SignupFormsRepository, BrokerSignupFormsPlansRepository, StatesAndProvincesRepository, BrokerSignupformsPlanlevelsRepository, TieredRebatesDataRepository, TieredRebatesRepository, UsersRepository, ContactInformationRepository, CustomerSignupRepository, CustomerRepository, PlanLevelRepository, BrokerEoInsuranceRepository } from '../repositories';
import { FileUploadHandler } from "../types";
import { BrokerEoInsurance, ContactInformation } from "../models";
export declare class BrokerController {
    BrokerRepository: BrokerRepository;
    BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository;
    BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository;
    BrokerSignupformsPlanlevelsRepository: BrokerSignupformsPlanlevelsRepository;
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
    constructor(BrokerRepository: BrokerRepository, BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository, BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository, BrokerSignupformsPlanlevelsRepository: BrokerSignupformsPlanlevelsRepository, TieredRebatesDataRepository: TieredRebatesDataRepository, TieredRebatesRepository: TieredRebatesRepository, UsersRepository: UsersRepository, ContactInformationRepository: ContactInformationRepository, SignupFormsRepository: SignupFormsRepository, StatesAndProvincesRepository: StatesAndProvincesRepository, CustomerSignupRepository: CustomerSignupRepository, CustomerRepository: CustomerRepository, InsurancePlansRepository: InsurancePlansRepository, PlanLevelRepository: PlanLevelRepository, BrokerEoInsuranceRepository: BrokerEoInsuranceRepository, response: Response, handler: FileUploadHandler);
    getBroker(): Promise<any>;
    brokerDetailsBasedonId(id: number): Promise<Response<any, Record<string, any>> | undefined>;
    custmerCount(id: number): Promise<any>;
    static newBroker(request: Request, method: string, others: any): Promise<void>;
    brokerLogoUpload(broker_id: number, request: Request, response: Response): Promise<Response>;
    broker_registration(request: Request, response: Response): Promise<Response>;
    broker_create_form(brokerId: number, apiRequest: any): Promise<Response>;
    checkAndGenerateNewFormLink(formLink: string, userid: number): Promise<string>;
    deleteForm(formId: number): Promise<any>;
    deleteBrokerForm(id: number): Promise<any>;
    formConfig(formLink?: string, lang?: string): Promise<Response>;
    modifyForm(formid: number, requestBody: {
        newType: string;
        planlevel?: Array<number>;
        oldType: string;
    }): Promise<Response>;
    updateContact(id: number, ContactInformation: Omit<ContactInformation, 'id'>): Promise<any>;
    updateLiceceState(requestBody: {
        states: Array<number>;
    }): Promise<any>;
    updateEO(BrokerEoInsurance: Omit<BrokerEoInsurance, 'id'>): Promise<any>;
    updateLiceceNum(): Promise<any>;
    deleteBroker(brokerId: number): Promise<Response<any, Record<string, any>>>;
}
