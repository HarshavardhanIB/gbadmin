import { Request } from 'express';
import { Credentials, MyUserService, UserRepository } from '@loopback/authentication-jwt';
import { UsersRepository, AdminRepository } from '../repositories';
import { SchemaObject } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { Admin } from '../models/admin.model';
import { JWTService } from '../services/jwt.service';
export declare class NewUserRequest extends Admin {
    password: string;
    username: string;
    email: string;
}
export declare type mailId = {
    email: string;
};
export declare type forgotPswrd = {
    oldpassword: string;
    newpassword: string;
};
export declare const CredentialsRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
export declare class AuthController {
    jwtService: JWTService;
    userService: MyUserService;
    user: UserProfile;
    protected userRepository: UserRepository;
    usersRepository: UsersRepository;
    adminRepository: AdminRepository;
    private request;
    constructor(jwtService: JWTService, userService: MyUserService, user: UserProfile, userRepository: UserRepository, usersRepository: UsersRepository, adminRepository: AdminRepository, request: Request);
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    whoAmI(currentUserProfile: UserProfile): Promise<string>;
    signUp(newUserRequest: NewUserRequest): Promise<Admin>;
    userLogin(credentials: Credentials): Promise<any>;
    forgotPassword(email: mailId): Promise<any>;
    activeuser(key: string): Promise<any>;
    chnagePasswords(requestBody: {
        oldpassword: string;
        newpassword: string;
    }): Promise<any>;
    app(): Promise<any>;
    ip(): Promise<any>;
}
