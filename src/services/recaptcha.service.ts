import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GoogleRcDataSource} from '../datasources';

export interface Recaptcha {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  validate(secretkey: string, sitekey: string): Promise<object>;
}

export class RecaptchaProvider implements Provider<Recaptcha> {
  constructor(
    // googleRC must match the name property in the datasource json file
    @inject('datasources.googleRC')
    protected dataSource: GoogleRcDataSource = new GoogleRcDataSource(),
  ) { }

  value(): Promise<Recaptcha> {
    return getService(this.dataSource);
  }
}
