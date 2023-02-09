import { RegistrationServiceService } from './registration-service.service';
import { AchService } from './ach.service';
import { BankCodesRepository, FinancialInstitutionsRepository, FinancialInstitutionsRoutingNumbersRepository, StatesAndProvincesRepository } from '../repositories';
import { FileUploadHandler } from '../types';
export declare class Corporate {
    handler: FileUploadHandler;
    registrationService: RegistrationServiceService;
    ach: AchService;
    banksCodesRepository: BankCodesRepository;
    banksRepository: FinancialInstitutionsRepository;
    branchesRepository: FinancialInstitutionsRoutingNumbersRepository;
    StatesAndProvincesRepository: StatesAndProvincesRepository;
    constructor(/* Add @inject to inject parameters */ handler: FileUploadHandler, registrationService: RegistrationServiceService, ach: AchService, banksCodesRepository: BankCodesRepository, banksRepository: FinancialInstitutionsRepository, branchesRepository: FinancialInstitutionsRoutingNumbersRepository, StatesAndProvincesRepository: StatesAndProvincesRepository);
    encryptPswrd(password: string): Promise<string>;
    modelPropoerties(model: any): Promise<any>;
    customerBankDetailsRegister(session: any, filenamets: any, ext: any, mimetype: any): Promise<any>;
}
