import { Count, Filter, Where } from '@loopback/repository';
import { Users, Broker } from '../models';
import { UsersRepository } from '../repositories';
export declare class UsersBrokerController {
    protected usersRepository: UsersRepository;
    constructor(usersRepository: UsersRepository);
    find(id: number, filter?: Filter<Broker>): Promise<Broker[]>;
    create(id: typeof Users.prototype.id, broker: Omit<Broker, 'id'>): Promise<Broker>;
    patch(id: number, broker: Partial<Broker>, where?: Where<Broker>): Promise<Count>;
    delete(id: number, where?: Where<Broker>): Promise<Count>;
}
