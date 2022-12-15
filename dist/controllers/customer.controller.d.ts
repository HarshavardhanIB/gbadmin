/// <reference types="express" />
import { Response } from '@loopback/rest';
import { UsersRepository, ContactInformationRepository, CustomerContactInfoRepository, CustomerPlanOptionsValuesRepository, CustomerPlansRepository, CustomerRelativesRepository, CustomerRepository, CustomerSignupRepository } from '../repositories';
export declare class customerController {
    usersRepository: UsersRepository;
    ContactInformationRepository: ContactInformationRepository;
    CustomerContactInfoRepository: CustomerContactInfoRepository;
    CustomerPlanOptionsValuesRepository: CustomerPlanOptionsValuesRepository;
    CustomerPlansRepository: CustomerPlansRepository;
    CustomerRelativesRepository: CustomerRelativesRepository;
    CustomerRepository: CustomerRepository;
    CustomerSignupRepository: CustomerSignupRepository;
    private response;
    constructor(usersRepository: UsersRepository, ContactInformationRepository: ContactInformationRepository, CustomerContactInfoRepository: CustomerContactInfoRepository, CustomerPlanOptionsValuesRepository: CustomerPlanOptionsValuesRepository, CustomerPlansRepository: CustomerPlansRepository, CustomerRelativesRepository: CustomerRelativesRepository, CustomerRepository: CustomerRepository, CustomerSignupRepository: CustomerSignupRepository, response: Response);
    customersCounr(): Promise<any>;
    customerslist(): Promise<Response>;
    allCustmerDetails(id: number): Promise<any>;
}
