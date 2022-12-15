/// <reference types="express" />
import { Response } from "@loopback/rest";
import { BrokerRepository, BrokerLicensedStatesAndProvincesRepository, BrokerSignupFormsPlansRepository, BrokerSignupformsPlanlevelsRepository, TieredRebatesDataRepository, TieredRebatesRepository, UsersRepository } from '../repositories';
export declare class BrokerController {
    BrokerRepository: BrokerRepository;
    BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository;
    BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository;
    BrokerSignupformsPlanlevelsRepository: BrokerSignupformsPlanlevelsRepository;
    TieredRebatesDataRepository: TieredRebatesDataRepository;
    TieredRebatesRepository: TieredRebatesRepository;
    UsersRepository: UsersRepository;
    private response;
    constructor(BrokerRepository: BrokerRepository, BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository, BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository, BrokerSignupformsPlanlevelsRepository: BrokerSignupformsPlanlevelsRepository, TieredRebatesDataRepository: TieredRebatesDataRepository, TieredRebatesRepository: TieredRebatesRepository, UsersRepository: UsersRepository, response: Response);
    getBroker(): Promise<any>;
}
