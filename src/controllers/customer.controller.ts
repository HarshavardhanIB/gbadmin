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
import { basicAuthorization } from '../middleware/auth.midd';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
@authenticate('jwt')
@authorize({
  allowedRoles: ['BROKER', 'ADMINISTRATOR'],
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
    let activeCoustomers = await this.CustomerRepository.count({ status: 'active' })
    let draftCoustomers = await this.CustomerRepository.count({ status: 'Draft' })
    let holdCoustomers = await this.CustomerRepository.count({ status: 'Hold' })
    let suspendedCoustomers = await this.CustomerRepository.count({ status: 'Suspended' })
    let cancelledCoustomers = await this.CustomerRepository.count({ status: 'Cancelled' })
    let otherCoustomers = await this.CustomerRepository.count({ status: '' })
    console.log(activeCoustomers);
    // console.log("role>>", currentUserProfile.role);
    let response = {
      "statusCode": 200,
      "message": "Count of the customers ",
      data: {
        totalCustomersCount: customerCount.count,
        activeCustomersCount: activeCoustomers.count,
        draftCoustomers: draftCoustomers.count,
        holdCoustomers: holdCoustomers.count,
        suspendedCoustomers: suspendedCoustomers.count,
        cancelledCoustomers: cancelledCoustomers.count,
        otherCoustomers: otherCoustomers.count
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
    let customers = await this.CustomerRepository.findById(id, { include: [{ relation: "customerRelativeRelation" }, { relation: 'customerPlans' }, { relation: 'customerSignup' }, { relation: 'contactInformations' }, { relation: 'customerPlanOptionsValues' }] });
    console.log(">>>>>>><<<<<<<<<", customers);
    let contactInfo: any = [];
    let userid = customers.userId;
    // let contactInfoObj = await this.CustomerContactInfoRepository.find({ where: { customerId: id } });
    // for (let j = 0; j < contactInfoObj.length; j++) {
    //   let contcatId = contactInfoObj[j].contactId;
    //   let contactInfoRes = await this.ContactInformationRepository.find({ where: { id: contcatId } });
    //   for (let j = 0; j < contactInfoRes.length; j++) {
    //     contactInfo.push(contactInfoRes[j]);
    //   }
    // }
    // let customerPlansObj = await this.CustomerPlansRepository.find({ where: { customerId: id } });
    // let custmerPlanOpt = await this.CustomerPlanOptionsValuesRepository.find({ where: { customerId: id } });
    // let custmrRelatives = await this.CustomerRelativesRepository.find({ where: { customerId: id } });
    // let signupdetails: any = await this.CustomerSignupRepository.findOne({ where: { customerId: id } });
    // var tfHours = signupdetails?.working_20hours[0];
    // delete signupdetails['working_20hours'];
    // if (tfHours == 1) {
    //   signupdetails['working_20hours'] = true
    // }
    // else {
    //   signupdetails['working_20hours'] = false;
    // }
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

}

