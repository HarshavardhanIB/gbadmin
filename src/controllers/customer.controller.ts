// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import { inject } from '@loopback/core';
import { authenticate } from '@loopback/authentication';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  RestBindings,
  Response,
} from '@loopback/rest';
import {
  ANY,
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import { Users, ContactInformation, CustomerContactInfo, CustomerPlanOptionsValues, CustomerPlans, CustomerRelatives, CustomerSignup, Customer } from '../models';
import { UsersRepository, ContactInformationRepository, CustomerContactInfoRepository, CustomerPlanOptionsValuesRepository, CustomerPlansRepository, CustomerRelativesRepository, CustomerRepository, CustomerSignupRepository } from '../repositories';
import { authorize } from '@loopback/authorization';
import { basicAuthorization } from '../middlewares/auth.middleware';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import * as CONST from '../constants';
import moment from 'moment';
import { from } from 'form-data';
import { toArray } from 'lodash';
@authenticate('jwt')
@authorize({
  allowedRoles: [CONST.USER_ROLE.BROKER, CONST.USER_ROLE.ADMINISTRATOR],
  voters: [basicAuthorization]
})
export class customerController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @repository(ContactInformationRepository)
    public ContactInformationRepository: ContactInformationRepository,
    @repository(CustomerContactInfoRepository)
    public CustomerContactInfoRepository: CustomerContactInfoRepository,
    @repository(CustomerPlanOptionsValuesRepository)
    public CustomerPlanOptionsValuesRepository: CustomerPlanOptionsValuesRepository,
    @repository(CustomerPlansRepository)
    public CustomerPlansRepository: CustomerPlansRepository,
    @repository(CustomerRelativesRepository)
    public CustomerRelativesRepository: CustomerRelativesRepository,
    @repository(CustomerRepository)
    public CustomerRepository: CustomerRepository,
    @repository(CustomerSignupRepository)
    public CustomerSignupRepository: CustomerSignupRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
  ) { }
  // @get('/customerInfo/{id}')
  // @response(200, {
  //   description: 'list of coustmers',
  // })
  // async custmer(
  //   @param.path.number('id') id: number
  // ): Promise<any> {
  //   let coustmers = await this.CustomerRepository.findById(id);
  //   console.log(coustmers);
  //   return coustmers;
  // }
  @get('/admin/customers/count')
  @response(200, {
    description: 'customers count',
  })
  // async customersCount(@inject(SecurityBindings.USER)
  // currentUserProfile: UserProfile): Promise<any> {
  async customersCount(): Promise<any> {
    let customerCount = await this.CustomerRepository.count();
    let active = await this.CustomerRepository.count({ status: 'active' })
    let draft = await this.CustomerRepository.count({ status: 'Draft' })
    let hold = await this.CustomerRepository.count({ status: 'Hold' })
    let suspended = await this.CustomerRepository.count({ status: 'Suspended' })
    let cancelled = await this.CustomerRepository.count({ status: 'Cancelled' })
    let other = await this.CustomerRepository.count({ status: '' })
    // console.log(activeCoustomers);
    // console.log("role>>", currentUserProfile.role);
    let response = {
      "statusCode": 200,
      "message": "Count of the customers ",
      data: {
        totalCustomersCount: customerCount.count,
        activeCustomersCount: active.count,
        draftCoustomers: draft.count,
        holdCoustomers: hold.count,
        suspendedCoustomers: suspended.count,
        cancelledCoustomers: cancelled.count,
        otherCoustomers: other.count
      }
    }
    return response;

  }
  // @authenticate.skip()
  @get('/admin/customers/list')
  @response(200, {
    description: 'List of customers list',
  })
  async customerslist(): Promise<Response> {
    const customers = await this.CustomerRepository.find(

      {
        where: {},
        fields: {
          id: true,
          firstName: true,
          lastName: true,
          registrationDate: true,
          user_id: true,
        },
        include: [{
          relation: 'user',
          scope: {
            where: {},
            fields: {
              username: true,
              role: true
            }

          }
        }]
      }
    );
    console.log(customers[customers.length - 1])
    const custmrList: any = [];
    console.log(">>>>>>>>>>>>>>>>>>>>>>>", custmrList.length);
    if (custmrList.length > 0) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>", custmrList[0]);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>", custmrList[custmrList.length - 1]);
    }
    const responseObject = {
      status: 200,
      message: "List of primary details",
      date: new Date(),
      data: customers
    }
    this.response.status(parseInt("200")).send(responseObject);
    return this.response;
  }
  // @authenticate.skip()
  @get('/admin/customers/{id}/details')
  async allCustmerDetails(@param.path.number('id') id: number): Promise<any> {
    let finalResultsArray: any = [];
    let finalObjforCustmr: any;
    let customers = await this.CustomerRepository.findById(id, { include: [{ relation: "customerRelatives" }, { relation: 'customerPlans' }, { relation: 'customerSignup' }, { relation: 'contactInformations' }, { relation: 'customerPlanOptionsValues' }] });
    console.log(">>>>>>><<<<<<<<<", customers);
    let contactInfo: any = [];
    let userid = customers.userId;
    if (!customers) {
      let response = {
        "statusCode": 201,
        "message": "no details found",

      }
      return response
    }
    let response = {
      "statusCode": 200,
      "message": "Customer details",
      "data": customers
    }
    return response;
  }
  @post('/admin/search', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'File',
      },
    }
  })
  async search(@requestBody({
    description: 'search filter for the customers',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            searchArray: {
              type: 'array',
              default: `[{"searchterm":"", "searchvalue":""},{"searchterm":"registrationdate","searchvalue":{from:"", to:""}}]`
            },
            status: {
              type: 'string',
              default: 'ALL',
            },
            count: {
              type: 'number',
              default: 0
            },
            strictOrpartial: {
              //when
              type: 'boolean',
              default: false
            }
          }
        }
      }
    }
  }) apiRequest: any): Promise<any> {
    let status, message, data: any;
    try {
      let filter: any = { where: { and: [] }, fields: { registrationDate: true, firstName: true, lastName: true, dob: true, status: true, gender: true }, limit: apiRequest.count };
      let searchArray = apiRequest.searchArray;
      if (apiRequest.status == "" || apiRequest.status == "ALL") {
      }
      else {
        filter.where["status"] = apiRequest.status;
      }
      for (const seatObj of searchArray) {
        let searchterm = seatObj.searchterm;
        let searchvalue = seatObj.searchvalue;
        if (searchterm == "registrationdate") {
          let from = searchvalue.from != "" ? searchvalue.from : '2001-01-01';
          let to = searchvalue.to != "" ? searchvalue.to : moment().format('YYYY-MM-DD');
          filter.where.and.push({ "registrationDate": { "between": [from, to] } })
          // filter.where.and.push({ and: [{ registrationDate: { gte: from } }, { registrationDate: { lt: to } }] })
          console.log(from, "***", to)
        }
        else {
          if (searchterm != "") {
            let obj: any = {};
            console.log(apiRequest.strictOrpartial)
            if (apiRequest.strictOrpartial) {
              obj[searchterm] = { like: `${searchvalue}` };
              filter.where.and.push(obj);
            }
            else {
              obj[searchterm] = searchvalue;
              filter.where.and.push(obj);
            }
          }
        }

      }
      // let andO = filter.where.and;
      // for (const a of andO) {
      //   console.log(a);
      //   if (a.and) {
      //     let aaa = a.and;
      //     for (const aa of aaa) {
      //       console.log(aa)
      //     }
      //   }
      // }
      let customers: any = await this.CustomerRepository.find(filter);
      if (customers.length > 0) {
        status = 200;
        message = "Customer details"
        data = customers;
      }
      else {
        status = 201;
        message = "No details found"
      }
    }
    catch (error) {
      status = 400;
      message = "Error " + error.message
    }
    this.response.status(status).send({
      status, message, data
    })
    return this.response;
  }
}

