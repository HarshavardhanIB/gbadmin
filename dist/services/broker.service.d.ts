import { BrokerEoInsuranceRepository, BrokerLicensedStatesAndProvincesRepository, BrokerRepository, SignupFormsPlanLevelMappingRepository, ContactInformationRepository, CustomerRepository, CustomerSignupRepository, InsurancePlansRepository, PlanLevelRepository, SignupFormsRepository, StatesAndProvincesRepository, UsersRepository } from '../repositories';
export declare class BrokerService {
    BrokerRepository: BrokerRepository;
    BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository;
    SignupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository;
    UsersRepository: UsersRepository;
    ContactInformationRepository: ContactInformationRepository;
    SignupFormsRepository: SignupFormsRepository;
    StatesAndProvincesRepository: StatesAndProvincesRepository;
    CustomerSignupRepository: CustomerSignupRepository;
    CustomerRepository: CustomerRepository;
    InsurancePlansRepository: InsurancePlansRepository;
    PlanLevelRepository: PlanLevelRepository;
    BrokerEoInsuranceRepository: BrokerEoInsuranceRepository;
    constructor(/* Add @inject to inject parameters */ BrokerRepository: BrokerRepository, BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository, SignupFormsPlanLevelMappingRepository: SignupFormsPlanLevelMappingRepository, UsersRepository: UsersRepository, ContactInformationRepository: ContactInformationRepository, SignupFormsRepository: SignupFormsRepository, StatesAndProvincesRepository: StatesAndProvincesRepository, CustomerSignupRepository: CustomerSignupRepository, CustomerRepository: CustomerRepository, InsurancePlansRepository: InsurancePlansRepository, PlanLevelRepository: PlanLevelRepository, BrokerEoInsuranceRepository: BrokerEoInsuranceRepository);
    print(): Promise<void>;
    updateContact(id: number, ContactInformation: any): Promise<{
        statusCode: number;
        message: any;
        date: Date;
    }>;
    updateLiceceState(brokerId: number, states: any): Promise<any>;
    updateEO(BrokerEoInsurance: any, brokerId: number): Promise<any>;
    updateLiceceNum(brokerId: number, licenceNum: any): Promise<any>;
}
