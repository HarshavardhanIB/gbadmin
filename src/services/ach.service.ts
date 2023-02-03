import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {ACH, ACHserviceEndpoints, PAD_CLIENT_ID, PAD_CLIENT_SECRET} from '../constants';
import {deleteFile} from '../storage.helper';
import {HttpService} from './http.service';

const server = ACH.server

@injectable({scope: BindingScope.TRANSIENT})
export class AchService {
  constructor(/* Add @inject to inject parameters */
    @service(HttpService) protected http: HttpService,
  ) { }

  /*
   * Add service methods here
   */

  async createCustomer(input: any) {

    const service = server + ACHserviceEndpoints.createCustomer//

    const data = input

    const headers: any = {
      'x-client-id': PAD_CLIENT_ID,
      'x-client-secret': PAD_CLIENT_SECRET
    }

    const response = await this.http.post(service, data, headers)
    return response;
  }

  async createCustomerNoresponse(input: any) {

    let message, status, data: any;
    const service = server + ACHserviceEndpoints.createCustomer//

    //const data = input

    const reqInp = input
    delete reqInp.newFilename
    delete reqInp.padFilename

    const headers: any = {
      'x-client-id': PAD_CLIENT_ID,
      'x-client-secret': PAD_CLIENT_SECRET
    }

    const response = await this.http.post(service, reqInp, headers)
    //return response;

    if (response && response.data) {

      console.log(input)

      if (input.newFilename)
        deleteFile(input.newFilename);

      if (input.padFilename)
        deleteFile(input.padFilename);

      data = response.data
      message = 'Customer Record(PAD) created'
      status = '200'
    } else {

      message = 'Customer Record(PAD) creation failed'
      status = '202'
    }
    console.log(status)
    console.log(data)
    console.log(message)
    // this.response.status(parseInt(status)).send({
    //   status: status,
    //   message: message,
    //   date: new Date(),
    //   data: data
    // });
  }


}
