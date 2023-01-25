export declare class CommonServiceService {
    constructor();
    randomString(length: number, chars: string): Promise<string>;
    generateRandomPassword(): Promise<string>;
    encryptPassword(password: string): Promise<string>;
    genCrypt(): Promise<string>;
    intersection(a: any, b: any): Promise<any>;
}
