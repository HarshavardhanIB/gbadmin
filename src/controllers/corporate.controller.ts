// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { get, param, requestBody, response, Response, RestBindings } from '@loopback/rest';
import { request } from 'http';
import { nextTick } from 'process';

import { BrokerRepository } from '../repositories'

export class CorporateController {
  constructor(
    @repository(BrokerRepository)
    public BrokerRepository: BrokerRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) { }
  @get('/corporate/{company}logo')
  async brokerDetailsBasedonId(@param.path.string('company') company: string): Promise<Response> {
    let message, status, statusCode, data: any = {};
    try {
      let broker = await this.BrokerRepository.findOne({ where: { name: company }, fields: { logo: true } });
      if (!broker) {
        statusCode = 202;
        message = "Send the correct broker name"
      }
      else {
        statusCode = 200;
        message = "Broker logo";
        data = "https://gbapi.aitestpro.com/" + broker.logo;
      }

    }
    catch (error) {
      statusCode = 201;
    }
    this.response.status(statusCode).send({
      status: status,
      message: message,
      "logo": data,
      date: new Date(),
    });
    return this.response;
  }
  @get('/broker/{brokerId}')
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  async brokerDetails(@param.path.number('brokerId') brokerId: number) {
    try {
      let broketDetails = await this.BrokerRepository.find({
        where: { id: brokerId, brokerType: 'ADMINISTRATOR' }, fields: { name: true, }, include: [{
          relation: 'user',
          scope: {
            fields: { username: true }
          }
        }]
      });

    } catch (error) {

    }
  }
}


