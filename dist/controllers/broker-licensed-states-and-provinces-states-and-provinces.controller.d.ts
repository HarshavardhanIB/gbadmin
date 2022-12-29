import { BrokerLicensedStatesAndProvinces, StatesAndProvinces } from '../models';
import { BrokerLicensedStatesAndProvincesRepository } from '../repositories';
export declare class BrokerLicensedStatesAndProvincesStatesAndProvincesController {
    brokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository;
    constructor(brokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository);
    getStatesAndProvinces(id: typeof BrokerLicensedStatesAndProvinces.prototype.id): Promise<StatesAndProvinces>;
}
