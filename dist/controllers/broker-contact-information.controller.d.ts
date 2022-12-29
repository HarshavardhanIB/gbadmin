import { Broker, ContactInformation } from '../models';
import { BrokerRepository } from '../repositories';
export declare class BrokerContactInformationController {
    brokerRepository: BrokerRepository;
    constructor(brokerRepository: BrokerRepository);
    getContactInformation(id: typeof Broker.prototype.id): Promise<ContactInformation>;
}
