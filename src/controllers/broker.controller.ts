// Uncomment these imports to begin using these cool features!

import { inject } from "@loopback/core";
import { repository } from "@loopback/repository";
import { get, Response, response, RestBindings } from "@loopback/rest";
import { publicEncrypt } from "crypto";
import { includes } from "lodash";
import { BrokerRepository, BrokerLicensedStatesAndProvincesRepository, BrokerSignupFormsPlansRepository, BrokerSignupformsPlanlevelsRepository, TieredRebatesDataRepository, TieredRebatesRepository, UsersRepository } from '../repositories'

// import {inject} from '@loopback/core';


export class BrokerController {
  constructor(
    @repository(BrokerRepository)
    public BrokerRepository: BrokerRepository,
    @repository(BrokerLicensedStatesAndProvincesRepository)
    public BrokerLicensedStatesAndProvincesRepository: BrokerLicensedStatesAndProvincesRepository,
    @repository(BrokerSignupFormsPlansRepository)
    public BrokerSignupFormsPlansRepository: BrokerSignupFormsPlansRepository,
    @repository(BrokerSignupformsPlanlevelsRepository)
    public BrokerSignupformsPlanlevelsRepository: BrokerSignupformsPlanlevelsRepository,
    @repository(TieredRebatesDataRepository)
    public TieredRebatesDataRepository: TieredRebatesDataRepository,
    @repository(TieredRebatesRepository)
    public TieredRebatesRepository: TieredRebatesRepository,
    @repository(UsersRepository)
    public UsersRepository: UsersRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response
  ) { }
  @get('/admin/broker')
  @response(200, {
    description: 'List of customers list',
  })
  async getBroker(): Promise<any> {
    try {
      let final: any = [];
      console.log(">>>>>1 st")
      let data = await this.BrokerRepository.find({
        where: {}, fields: {
          name: true,
          parentId: true,
          logo: true,
          published: true,
          brokerType: true,
          description: true,
          salesTrackingCode: true,
          usePadPaymentMethod: true
        }
      });
      console.log("data>>>", data);
      for (let i = 0; i <= data.length; i++) {
        let dataArray: any = data[i];
        let userId = dataArray.userId;
        let userDetails = await this.UsersRepository.find({ where: { id: userId }, fields: { username: true } });
        dataArray['emailId'] = userDetails
        final.push(dataArray)
      }
      const responseObject = {
        status: 200,
        message: "List of primary details",
        date: new Date(),
        data: final
      }
      this.response.status(parseInt("200")).send(responseObject);
      return this.response;
    }

    catch (err) {
      console.log(err);
    }

  }
}
