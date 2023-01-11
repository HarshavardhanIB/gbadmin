export declare class AuthService {
    constructor();
    MailContent(type: string, password: string, inActiveUser: boolean, link: string): Promise<string>;
}
