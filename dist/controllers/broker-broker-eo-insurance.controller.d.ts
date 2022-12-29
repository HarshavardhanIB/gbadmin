import { Count, Filter, Where } from '@loopback/repository';
import { Broker, BrokerEoInsurance } from '../models';
import { BrokerRepository } from '../repositories';
export declare class BrokerBrokerEoInsuranceController {
    protected brokerRepository: BrokerRepository;
    constructor(brokerRepository: BrokerRepository);
    get(id: number, filter?: Filter<BrokerEoInsurance>): Promise<BrokerEoInsurance>;
    create(id: typeof Broker.prototype.id, brokerEoInsurance: Omit<BrokerEoInsurance, 'id'>): Promise<BrokerEoInsurance>;
    patch(id: number, brokerEoInsurance: Partial<BrokerEoInsurance>, where?: Where<BrokerEoInsurance>): Promise<Count>;
    delete(id: number, where?: Where<BrokerEoInsurance>): Promise<Count>;
}
