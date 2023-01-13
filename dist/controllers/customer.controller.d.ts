/// <reference types="express" />
import { Response } from '@loopback/rest';
import { UsersRepository, ContactInformationRepository, CustomerContactInfoRepository, CustomerPlanOptionsValuesRepository, CustomerPlansRepository, CustomerRelativesRepository, CustomerRepository, CustomerSignupRepository } from '../repositories';
import { UserProfile } from '@loopback/security';
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
    user: UserProfile;
    constructor(usersRepository: UsersRepository, ContactInformationRepository: ContactInformationRepository, CustomerContactInfoRepository: CustomerContactInfoRepository, CustomerPlanOptionsValuesRepository: CustomerPlanOptionsValuesRepository, CustomerPlansRepository: CustomerPlansRepository, CustomerRelativesRepository: CustomerRelativesRepository, CustomerRepository: CustomerRepository, CustomerSignupRepository: CustomerSignupRepository, response: Response, user: UserProfile);
    customersCount(): Promise<any>;
    customerslist(): Promise<Response>;
    allCustmerDetails(id: number): Promise<any>;
    search(apiRequest: any): Promise<any>;
}
