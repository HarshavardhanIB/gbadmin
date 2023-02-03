import { Provider } from '@loopback/core';
import { GoogleRcDataSource } from '../datasources';
export interface Recaptcha {
    validate(secretkey: string, sitekey: string): Promise<object>;
}
export declare class RecaptchaProvider implements Provider<Recaptcha> {
    protected dataSource: GoogleRcDataSource;
    constructor(dataSource?: GoogleRcDataSource);
    value(): Promise<Recaptcha>;
}
