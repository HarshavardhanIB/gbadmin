import { Credentials } from '@loopback/authentication-jwt';
import { AdminRepository, UsersRepository } from '../repositories';
import { NewUserRequest } from './auth.controller';
export declare class AdminCorporateController {
    usersRepository: UsersRepository;
    adminRepository: AdminRepository;
    constructor(usersRepository: UsersRepository, adminRepository: AdminRepository);
    signUp(newUserRequest: NewUserRequest): Promise<any>;
    userLogin(credentials: Credentials): Promise<any>;
}
