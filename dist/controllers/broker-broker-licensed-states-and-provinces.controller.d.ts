import { Count, Filter, Where } from '@loopback/repository';
import { Broker, BrokerLicensedStatesAndProvinces } from '../models';
import { BrokerRepository } from '../repositories';
export declare class BrokerBrokerLicensedStatesAndProvincesController {
    protected brokerRepository: BrokerRepository;
    constructor(brokerRepository: BrokerRepository);
    find(id: number, filter?: Filter<BrokerLicensedStatesAndProvinces>): Promise<BrokerLicensedStatesAndProvinces[]>;
    create(id: typeof Broker.prototype.id, brokerLicensedStatesAndProvinces: Omit<BrokerLicensedStatesAndProvinces, 'id'>): Promise<BrokerLicensedStatesAndProvinces>;
    patch(id: number, brokerLicensedStatesAndProvinces: Partial<BrokerLicensedStatesAndProvinces>, where?: Where<BrokerLicensedStatesAndProvinces>): Promise<Count>;
    delete(id: number, where?: Where<BrokerLicensedStatesAndProvinces>): Promise<Count>;
}
