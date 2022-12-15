import { Count, Filter, Where } from '@loopback/repository';
import { Broker, Users } from '../models';
import { BrokerRepository } from '../repositories';
export declare class BrokerUsersController {
    protected brokerRepository: BrokerRepository;
    constructor(brokerRepository: BrokerRepository);
    get(id: number, filter?: Filter<Users>): Promise<Users>;
    create(id: typeof Broker.prototype.id, users: Omit<Users, 'id'>): Promise<Users>;
    patch(id: number, users: Partial<Users>, where?: Where<Users>): Promise<Count>;
    delete(id: number, where?: Where<Users>): Promise<Count>;
}
